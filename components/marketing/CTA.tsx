import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="px-6 py-20">
      <div className="rounded-[2rem] bg-[var(--surface-dark)] px-8 py-12 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Ready to begin</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight">
          Go from Bitcoin-curious to confident with a clean, guided curriculum.
        </h2>
        <div className="mt-8">
          <Link href="/auth/register">
            <Button className="bg-white text-[var(--surface-dark)] hover:bg-amber-100">
              Create account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
