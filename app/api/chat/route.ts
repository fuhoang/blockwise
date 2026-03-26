import { NextResponse } from "next/server";

import { getTutorRequestLimit, hasProAccess } from "@/lib/billing";
import { checkRateLimit } from "@/lib/rate-limit";
import { createTutorReply, inferTutorTopic } from "@/lib/openai";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const MAX_MESSAGE_LENGTH = 500;
const CHAT_RATE_WINDOW_MS = 60_000;
const TUTOR_PROMPT_PREVIEW_MAX = 160;

function buildTutorUsage(
  limit: number,
  limitResult: { remaining: number; resetAt: number },
) {
  return {
    limit,
    remaining: limitResult.remaining,
    resetAt: limitResult.resetAt,
  };
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 500 },
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Log in to use the AI tutor." },
        { status: 401 },
      );
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select(
        "user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, plan_slug, status, current_period_start, current_period_end, cancel_at_period_end, created_at, updated_at",
      )
      .eq("user_id", user.id)
      .maybeSingle();

    const tutorRequestLimit = getTutorRequestLimit({
      configured: true,
      customerId: null,
      purchaseEvents: [],
      subscription: subscription ?? null,
    });

    const limitResult = checkRateLimit(
      `chat:${user.id}`,
      tutorRequestLimit,
      CHAT_RATE_WINDOW_MS,
    );

    if (!limitResult.allowed) {
      return NextResponse.json(
        { error: "You have reached the tutor limit for now. Please try again in a minute." },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.max(
                1,
                Math.ceil((limitResult.resetAt - Date.now()) / 1000),
              ),
            ),
          },
        },
      );
    }

    const body = (await request.json()) as { message?: unknown };
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Please enter a question before submitting." },
        { status: 400 },
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Please keep tutor questions under 500 characters." },
        { status: 400 },
      );
    }

    const reply = await createTutorReply(message);
    const topic = inferTutorTopic(message);
    const responsePreview = reply.slice(0, TUTOR_PROMPT_PREVIEW_MAX);
    const recordedAt = new Date().toISOString();

    void supabase.from("learning_activity").insert({
      activity_context: topic,
      activity_type: "tutor_prompt",
      created_at: recordedAt,
      lesson_slug: "ai-tutor",
      lesson_title: message,
      response_preview: responsePreview,
      user_id: user.id,
    });

    return NextResponse.json({
      reply,
      recordedAt,
      topic,
      usage: {
        ...buildTutorUsage(tutorRequestLimit, limitResult),
        plan: hasProAccess({
          configured: true,
          customerId: null,
          purchaseEvents: [],
          subscription: subscription ?? null,
        })
          ? "pro"
          : "free",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request right now." },
      { status: 500 },
    );
  }
}
