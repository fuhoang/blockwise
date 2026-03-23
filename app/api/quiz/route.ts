import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { answer?: string };
  const correct =
    body.answer === "Bitcoin is valuable because supply is predictable and verification is open.";

  return NextResponse.json({
    correct,
    explanation:
      "Bitcoin scarcity matters because issuance rules are transparent and difficult to change unilaterally.",
  });
}
