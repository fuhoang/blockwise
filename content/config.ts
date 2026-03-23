import type { LessonMeta } from "@/types/lesson";

export const lessonConfig: LessonMeta[] = [
  {
    slug: "what-is-money",
    title: "What Is Money?",
    summary: "Trace why societies adopt money and what properties make it useful.",
    duration: "8 min",
    order: 1,
  },
  {
    slug: "what-is-bitcoin",
    title: "What Is Bitcoin?",
    summary: "Learn the core idea behind a scarce, open monetary network.",
    duration: "12 min",
    order: 2,
  },
  {
    slug: "wallets",
    title: "Wallets",
    summary: "Understand keys, custody, and what a wallet actually manages.",
    duration: "10 min",
    order: 3,
  },
  {
    slug: "transactions",
    title: "Transactions",
    summary: "See how Bitcoin transactions move value and settle on-chain.",
    duration: "11 min",
    order: 4,
  },
  {
    slug: "security",
    title: "Security",
    summary: "Build safe habits for backups, scams, and device hygiene.",
    duration: "9 min",
    order: 5,
  },
];
