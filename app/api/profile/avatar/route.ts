import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import {
  getAuthenticatedServerSupabaseOrError,
  jsonError,
  parseJsonBody,
} from "@/lib/api-route";
import { getSupabaseBrowserEnv } from "@/lib/supabase/config";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function sanitizeFilename(filename: string) {
  return filename.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
}

function getAvatarStoragePath(avatarUrl: string, userId: string) {
  try {
    const url = new URL(avatarUrl);
    const supabaseEnv = getSupabaseBrowserEnv();

    if (supabaseEnv && url.origin !== new URL(supabaseEnv.url).origin) {
      return null;
    }

    const marker = "/storage/v1/object/public/avatars/";
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex === -1) {
      return null;
    }

    const path = decodeURIComponent(
      url.pathname.slice(markerIndex + marker.length),
    );

    if (!path.startsWith(`${userId}/`)) {
      return null;
    }

    return path;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const authResult = await getAuthenticatedServerSupabaseOrError({
    unauthorizedMessage: "You must be logged in to upload an avatar.",
  });

  if ("response" in authResult) {
    return authResult.response;
  }

  const { supabase, user } = authResult;
  let formData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError("Send a valid avatar upload body.", 400);
  }
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return jsonError("Choose an image before uploading.", 400);
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return jsonError("Avatar images must be JPG, PNG, or WebP.", 400);
  }

  if (file.size > MAX_AVATAR_SIZE) {
    return jsonError("Avatar images must be 2MB or smaller.", 400);
  }

  const extension = file.name.includes(".")
    ? file.name.split(".").pop()
    : file.type.split("/").pop();
  const path = `${user.id}/${randomUUID()}-${sanitizeFilename(file.name || `avatar.${extension ?? "png"}`)}`;

  let uploadError;

  try {
    ({ error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      }));
  } catch {
    return jsonError("Unable to upload your avatar right now.", 503);
  }

  if (uploadError) {
    const message =
      /bucket/i.test(uploadError.message) || /row-level security|policy/i.test(uploadError.message)
        ? "Avatar storage is not fully configured in Supabase yet. Rerun supabase/schema.sql and try again."
        : "Unable to upload your avatar right now.";

    return jsonError(message, 500);
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  return NextResponse.json({
    avatarUrl: data.publicUrl,
    path,
  });
}

export async function DELETE(request: Request) {
  const authResult = await getAuthenticatedServerSupabaseOrError({
    unauthorizedMessage: "You must be logged in to remove an avatar.",
  });

  if ("response" in authResult) {
    return authResult.response;
  }

  const { supabase, user } = authResult;
  const bodyResult = await parseJsonBody<{ avatarUrl?: unknown }>(
    request,
    "Send a valid avatar removal body.",
  );

  if ("response" in bodyResult) {
    return bodyResult.response;
  }

  const body = bodyResult.data;

  if (typeof body.avatarUrl !== "string" || body.avatarUrl.trim().length === 0) {
    return jsonError("Choose an avatar to remove first.", 400);
  }

  const path = getAvatarStoragePath(body.avatarUrl, user.id);

  if (!path) {
    return jsonError("That avatar does not belong to this account.", 400);
  }

  let error;

  try {
    ({ error } = await supabase.storage.from("avatars").remove([path]));
  } catch {
    return jsonError("Unable to remove your avatar right now.", 503);
  }

  if (error) {
    return jsonError("Unable to remove your avatar right now.", 500);
  }

  return NextResponse.json({ removed: true });
}
