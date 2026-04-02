import { NextResponse } from "next/server";

import {
  getAuthenticatedServerSupabaseOrError,
  jsonError,
  parseJsonBody,
} from "@/lib/api-route";
import { getSupabaseBrowserEnv } from "@/lib/supabase/config";

function sanitizeDisplayName(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 50) : null;
}

function sanitizeShortText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, maxLength) : null;
}

function sanitizeAvatarUrl(value: unknown, userId: string) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    const env = getSupabaseBrowserEnv();

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    if (
      !env ||
      !url.toString().startsWith(
        `${env.url}/storage/v1/object/public/avatars/`,
      )
    ) {
      return null;
    }

    const prefix = `${env.url}/storage/v1/object/public/avatars/${userId}/`;

    if (!url.toString().startsWith(prefix)) {
      return null;
    }

    return url.toString().slice(0, 500);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const authResult = await getAuthenticatedServerSupabaseOrError({
    unauthorizedMessage: "You must be logged in to update your profile.",
  });

  if ("response" in authResult) {
    return authResult.response;
  }

  const { supabase, user } = authResult;

  const bodyResult = await parseJsonBody<{
    avatar_url?: unknown;
    bio?: unknown;
    display_name?: unknown;
    timezone?: unknown;
  }>(request, "Send a valid profile update body.");

  if ("response" in bodyResult) {
    return bodyResult.response;
  }

  const body = bodyResult.data;
  const displayName = sanitizeDisplayName(body.display_name);
  const avatarUrl = sanitizeAvatarUrl(body.avatar_url, user.id);
  const bio = sanitizeShortText(body.bio, 240);
  const timezone = sanitizeShortText(body.timezone, 100);

  let data;
  let error;

  try {
    ({ data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          avatar_url: avatarUrl,
          bio,
          id: user.id,
          email: user.email ?? null,
          display_name: displayName,
          timezone,
        },
        { onConflict: "id" },
      )
      .select("id, email, display_name, avatar_url, bio, timezone, created_at")
      .single());
  } catch {
    return jsonError("Unable to update your profile right now.", 503);
  }

  if (error) {
    const message =
      error.message.includes("column") || error.code === "PGRST204"
        ? "Your Supabase profiles table is missing the latest profile fields. Rerun supabase/schema.sql and try again."
        : "Unable to update your profile right now.";

    return jsonError(message, 500);
  }

  return NextResponse.json({ profile: data });
}
