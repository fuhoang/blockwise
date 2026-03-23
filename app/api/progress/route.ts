import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { slug?: string; complete?: boolean };

  return NextResponse.json({
    saved: true,
    slug: body.slug ?? null,
    complete: Boolean(body.complete),
    updatedAt: new Date().toISOString(),
  });
}
