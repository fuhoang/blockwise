import { NextResponse } from "next/server";

import { getAuthenticatedServerSupabaseOrError, jsonError } from "@/lib/api-route";
import { syncProfileForUser } from "@/lib/profile";

export async function POST() {
  const authResult = await getAuthenticatedServerSupabaseOrError({
    unauthorizedMessage: "You must be logged in to sync your profile.",
  });

  if ("response" in authResult) {
    return authResult.response;
  }

  const { user } = authResult;

  let profile;

  try {
    profile = await syncProfileForUser(user);
  } catch {
    return jsonError("Unable to sync your profile right now.", 503);
  }

  if (!profile) {
    return jsonError("Unable to sync your profile right now.", 500);
  }

  return NextResponse.json({ profile });
}
