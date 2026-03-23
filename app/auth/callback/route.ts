import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/dashboard";
  const response = NextResponse.redirect(new URL(next, request.url));

  response.cookies.set("demo-auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
