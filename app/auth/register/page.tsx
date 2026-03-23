import Link from "next/link";

import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-6 py-12">
      <Card className="w-full p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Register
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Create your learner account</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          Replace this page with your real email, OAuth, or Supabase registration flow when you wire auth.
        </p>
        <Link
          href="/auth/callback?next=/dashboard"
          className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
        >
          Create demo account
        </Link>
      </Card>
    </div>
  );
}
