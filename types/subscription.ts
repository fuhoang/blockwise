export type SubscriptionStatus = "inactive" | "trialing" | "active";

export interface Subscription {
  plan: "starter" | "pro";
  status: SubscriptionStatus;
  renewalLabel: string;
}
