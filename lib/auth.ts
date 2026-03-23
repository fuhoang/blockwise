import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getDemoUser } from "@/lib/supabase";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get("demo-auth")?.value === "1";
  return authenticated ? getDemoUser() : null;
}

export async function requireSessionUser() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
}
