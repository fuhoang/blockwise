import { NextResponse } from "next/server";

import { createCheckoutSession } from "@/lib/stripe";

export async function POST() {
  const session = await createCheckoutSession();
  return NextResponse.json(session);
}
