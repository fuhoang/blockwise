import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#fff8ee]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-black tracking-[0.18em] uppercase">
          SatoshiLearn
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          <Link href="/pricing">Pricing</Link>
          <Link href="/learn">Curriculum</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm font-medium text-[var(--muted)]">
            Log in
          </Link>
          <Link href="/auth/register">
            <Button>Start Learning</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
