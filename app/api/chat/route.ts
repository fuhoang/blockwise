import { NextResponse } from "next/server";

import { createTutorReply } from "@/lib/openai";

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const reply = await createTutorReply(body.message ?? "");

  return NextResponse.json({ reply });
}
