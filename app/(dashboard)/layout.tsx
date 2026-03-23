import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { requireSessionUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireSessionUser();

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="space-y-4">
        <div className="surface rounded-3xl p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Signed in</p>
          <p className="mt-2 text-lg font-bold">{user.name}</p>
          <p className="text-sm text-[var(--muted)]">{user.email}</p>
        </div>
        <Sidebar />
      </div>
      <main>{children}</main>
    </div>
  );
}
