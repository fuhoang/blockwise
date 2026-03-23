"use client";

import type { AppUser } from "@/types/user";

export function useUser() {
  const user: AppUser = {
    id: "demo-user",
    email: "learner@satoshilearn.dev",
    name: "Demo Learner",
    tier: "pro",
  };

  return user;
}
