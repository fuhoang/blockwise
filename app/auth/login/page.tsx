import Link from "next/link";

import { Card } from "@/components/ui/Card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next ?? "/dashboard";

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-12">
      <Card className="w-full p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Login
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Access your learning dashboard</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          This scaffold uses a demo auth flow so you can protect routes and continue building real auth later.
        </p>
        <Link
          href={`/auth/callback?next=${encodeURIComponent(next)}`}
          className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
        >
          Continue with demo session
        </Link>
      </Card>
    </div>
  );
}
