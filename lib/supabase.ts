import type { AppUser } from "@/types/user";

export function getDemoUser(): AppUser {
  return {
    id: "demo-user",
    email: "learner@satoshilearn.dev",
    name: "Demo Learner",
    tier: "pro",
  };
}
