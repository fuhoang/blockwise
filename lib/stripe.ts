export async function createCheckoutSession() {
  return {
    url: "/dashboard?checkout=demo",
    status: "demo",
  };
}

export async function verifyWebhookSignature() {
  return true;
}
