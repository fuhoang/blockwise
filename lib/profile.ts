import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";

export async function getOrCreateProfile() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/auth/login?next=/profiles");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/profiles");
  }

  const fallbackProfile: Profile = {
    id: user.id,
    email: user.email ?? null,
    created_at: user.created_at,
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email: user.email ?? null,
      },
      {
        onConflict: "id",
      },
    )
    .select("id, email, created_at")
    .single();

  if (error || !data) {
    return fallbackProfile;
  }

  return data as Profile;
}
