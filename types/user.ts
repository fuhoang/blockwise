export type UserTier = "free" | "pro";

export interface AppUser {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
}
