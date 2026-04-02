import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

type ServerSupabaseClient = Exclude<
  Awaited<ReturnType<typeof createServerSupabaseClient>>,
  null
>;

type AuthenticatedSupabaseUser = NonNullable<
  Awaited<ReturnType<ServerSupabaseClient["auth"]["getUser"]>>["data"]["user"]
>;

type JsonBodyResult<T> =
  | {
      data: T;
    }
  | {
      response: NextResponse;
    };

type ServerSupabaseResult =
  | {
      supabase: ServerSupabaseClient;
    }
  | {
      response: NextResponse;
    };

type AuthenticatedSupabaseResult =
  | {
      supabase: ServerSupabaseClient;
      user: AuthenticatedSupabaseUser;
    }
  | {
      response: NextResponse;
    };

type AuthenticatedSupabaseOptions = {
  unavailableMessage?: string;
  unconfiguredMessage?: string;
  unauthorizedMessage: string;
  verifyMessage?: string;
};

type StripeRouteErrorMessages = {
  authentication: string;
  connection: string;
  fallback: string;
  rateLimit: string;
};

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function parseJsonBody<T>(
  request: Request,
  invalidMessage: string,
): Promise<JsonBodyResult<T>> {
  try {
    return {
      data: (await request.json()) as T,
    };
  } catch {
    return {
      response: jsonError(invalidMessage, 400),
    };
  }
}

export async function getServerSupabaseOrError(options?: {
  unavailableMessage?: string;
  unconfiguredMessage?: string;
}): Promise<ServerSupabaseResult> {
  try {
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      return {
        response: jsonError(
          options?.unconfiguredMessage ?? "Supabase is not configured.",
          500,
        ),
      };
    }

    return { supabase };
  } catch {
    return {
      response: jsonError(
        options?.unavailableMessage ?? "Unable to reach Supabase right now.",
        503,
      ),
    };
  }
}

export async function getAuthenticatedServerSupabaseOrError(
  options: AuthenticatedSupabaseOptions,
): Promise<AuthenticatedSupabaseResult> {
  const supabaseResult = await getServerSupabaseOrError(options);

  if ("response" in supabaseResult) {
    return supabaseResult;
  }

  try {
    const {
      data: { user },
    } = await supabaseResult.supabase.auth.getUser();

    if (!user) {
      return {
        response: jsonError(options.unauthorizedMessage, 401),
      };
    }

    return {
      supabase: supabaseResult.supabase,
      user,
    };
  } catch {
    return {
      response: jsonError(
        options.verifyMessage ?? "Unable to verify your account right now.",
        503,
      ),
    };
  }
}

export function createStripeRouteErrorResponse(
  error: unknown,
  messages: StripeRouteErrorMessages,
) {
  const type = typeof error === "object" && error !== null && "type" in error
    ? String((error as { type?: unknown }).type)
    : "";
  const code = typeof error === "object" && error !== null && "code" in error
    ? String((error as { code?: unknown }).code)
    : "";
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (type === "StripeRateLimitError") {
    return jsonError(messages.rateLimit, 429);
  }

  if (type === "StripeAuthenticationError") {
    return jsonError(messages.authentication, 502);
  }

  if (
    type === "StripeAPIConnectionError" ||
    code === "ECONNRESET" ||
    code === "ETIMEDOUT" ||
    message.includes("network") ||
    message.includes("timeout")
  ) {
    return jsonError(messages.connection, 503);
  }

  return jsonError(messages.fallback, 502);
}
