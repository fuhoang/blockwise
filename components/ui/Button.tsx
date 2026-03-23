import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5",
        variant === "primary" &&
          "bg-[var(--accent)] text-white shadow-lg shadow-amber-700/20 hover:bg-[var(--accent-strong)]",
        variant === "secondary" &&
          "surface text-[var(--foreground)] hover:border-amber-700/25",
        variant === "ghost" &&
          "bg-transparent text-[var(--muted)] hover:bg-black/5",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
