import { NextResponse } from "next/server";

import { verifyWebhookSignature } from "@/lib/stripe";

export async function POST() {
  const valid = await verifyWebhookSignature();
  return NextResponse.json({ received: true, valid });
}
