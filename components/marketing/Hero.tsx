import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="grid gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent-strong)]">
          Learn Bitcoin properly
        </p>
        <h1 className="max-w-3xl text-5xl font-black tracking-tight text-[var(--foreground)] md:text-7xl">
          Bitcoin education built like a product, not a threadstorm.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Structured lessons, interactive quizzes, and an AI tutor that explains hard concepts without collapsing into jargon.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/auth/register">
            <Button>Start for free</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="secondary">See pricing</Button>
          </Link>
        </div>
      </div>
      <div className="surface grid-bg rounded-[2rem] p-8">
        <div className="rounded-[1.5rem] bg-[var(--surface-dark)] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Lesson snapshot</p>
          <h2 className="mt-4 text-3xl font-bold">Why Money Evolves</h2>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            Money wins when it lowers the coordination cost of trade. Bitcoin extends that logic into native internet value.
          </p>
          <div className="mt-8 rounded-3xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-100">Tutor tip</p>
            <p className="mt-2 text-sm leading-7 text-stone-200">
              If you understand why societies converge on money, Bitcoin becomes much easier to reason about.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
