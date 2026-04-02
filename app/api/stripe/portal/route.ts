import { NextResponse } from "next/server";

import { createStripeRouteErrorResponse, jsonError } from "@/lib/api-route";
import { createBillingPortalSessionForCurrentUser } from "@/lib/billing";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const stripe = getStripe();

  if (!stripe) {
    return jsonError("Stripe billing is not configured.", 500);
  }

  let portalUrl;

  try {
    portalUrl = await createBillingPortalSessionForCurrentUser();
  } catch (error) {
    return createStripeRouteErrorResponse(error, {
      authentication: "Stripe billing is temporarily unavailable.",
      connection: "Unable to reach Stripe right now. Please try again shortly.",
      fallback: "Unable to open billing portal right now.",
      rateLimit:
        "Stripe is rate limiting billing portal access right now. Please try again in a minute.",
    });
  }

  if (!portalUrl) {
    return jsonError("Unable to open billing portal for this account.", 401);
  }

  return NextResponse.json({ portalUrl });
}
