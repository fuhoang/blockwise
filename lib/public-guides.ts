import type { Route } from "next";

export type PublicGuide = {
  description: string;
  eyebrow: string;
  faq: Array<{
    answer: string;
    question: string;
  }>;
  href: Route;
  id: "learn-crypto" | "bitcoin-for-beginners" | "crypto-wallet-basics";
  intro: string;
  sections: Array<{
    body: string;
    title: string;
  }>;
  summary: string;
  title: string;
};

export const publicGuides: PublicGuide[] = [
  {
    id: "learn-crypto",
    href: "/learn-crypto",
    eyebrow: "Crypto basics",
    title: "Learn crypto with a clear starting path",
    summary:
      "Get a practical introduction to crypto through simple explanations, guided lessons, and a live Bitcoin-first learning track.",
    description:
      "Learn crypto with a beginner-friendly roadmap, starting with a live Bitcoin track, practical explanations, quizzes, and an AI tutor in Blockwise.",
    intro:
      "Crypto makes more sense when you learn the core ideas in order. Blockwise starts with Bitcoin because it gives beginners a clear foundation in money, wallets, ownership, and network trust before expanding into more tracks.",
    sections: [
      {
        title: "Start with the foundations",
        body:
          "Learn why money matters, what makes digital assets different, and how open networks handle trust, ownership, and scarcity.",
      },
      {
        title: "Move into wallets and transactions",
        body:
          "Build confidence around self-custody, seed phrases, fees, confirmations, and the mistakes beginners should avoid early on.",
      },
      {
        title: "Use guided practice",
        body:
          "Lessons, quizzes, and the AI tutor work together so you can reinforce concepts instead of passively reading through them.",
      },
    ],
    faq: [
      {
        question: "Is Blockwise only for Bitcoin right now?",
        answer:
          "The live curriculum is Bitcoin-first today, but the product is designed to grow into broader crypto tracks without changing the learning flow.",
      },
      {
        question: "Who is this guide for?",
        answer:
          "It is built for beginners who want structure, safer explanations, and a clearer path into crypto than scattered videos or social posts.",
      },
      {
        question: "Do I need technical experience?",
        answer:
          "No. The goal is to explain core crypto concepts in plain language and build intuition before deeper technical details.",
      },
    ],
  },
  {
    id: "bitcoin-for-beginners",
    href: "/bitcoin-for-beginners",
    eyebrow: "Bitcoin beginners",
    title: "Bitcoin for beginners, without the noise",
    summary:
      "Understand Bitcoin step by step with beginner lessons on money, scarcity, wallets, transactions, and security.",
    description:
      "Explore Bitcoin for beginners with lessons on money, scarcity, wallets, transactions, and self-custody in Blockwise.",
    intro:
      "Bitcoin is the best place to start if you want to understand crypto clearly. It teaches the foundations of digital scarcity, ownership, and network verification without requiring you to memorize jargon first.",
    sections: [
      {
        title: "Understand why Bitcoin exists",
        body:
          "Start with the monetary problems Bitcoin responds to, then build toward how scarcity, decentralization, and open verification fit together.",
      },
      {
        title: "Learn safe ownership habits",
        body:
          "Beginner-friendly lessons explain wallets, keys, seed phrases, and the practical security habits that matter most.",
      },
      {
        title: "Practice with simple reinforcement",
        body:
          "Use quizzes and guided tutor prompts to test what you understand and slow down when a topic needs another pass.",
      },
    ],
    faq: [
      {
        question: "Why start with Bitcoin instead of another crypto asset?",
        answer:
          "Bitcoin gives beginners the clearest starting point for understanding scarcity, ownership, and open monetary networks before they compare other systems.",
      },
      {
        question: "Will this help with wallets and transactions?",
        answer:
          "Yes. The curriculum covers wallet basics, self-custody, transaction flow, confirmations, and common mistakes.",
      },
      {
        question: "Can I learn at my own pace?",
        answer:
          "Yes. The lessons are short, progress is saved to your account, and the AI tutor is there when you want extra explanation.",
      },
    ],
  },
  {
    id: "crypto-wallet-basics",
    href: "/crypto-wallet-basics",
    eyebrow: "Wallet basics",
    title: "Crypto wallet basics for real beginners",
    summary:
      "Learn what a crypto wallet actually does, how keys work, and how to avoid the most common beginner mistakes.",
    description:
      "Understand crypto wallet basics, including keys, seed phrases, self-custody, and safer storage habits with Blockwise.",
    intro:
      "Most beginners think a wallet holds coins. In practice, wallets manage keys and access. Once that clicks, the rest of self-custody becomes much easier to understand.",
    sections: [
      {
        title: "What a wallet really controls",
        body:
          "A wallet manages your keys and helps you sign actions on-chain. That means the core lesson is ownership and access, not coins sitting inside an app.",
      },
      {
        title: "Why seed phrases matter",
        body:
          "Recovery phrases are the backup to your access. Understanding them early makes the difference between safe custody and fragile setup habits.",
      },
      {
        title: "How beginners stay safer",
        body:
          "Good wallet habits are boring on purpose: verify addresses, slow down, protect backups, and understand custodial versus non-custodial tradeoffs.",
      },
    ],
    faq: [
      {
        question: "Is this only about Bitcoin wallets?",
        answer:
          "The live examples in Blockwise start with Bitcoin, but the underlying wallet concepts apply broadly across crypto.",
      },
      {
        question: "Do I need a hardware wallet immediately?",
        answer:
          "Not always. Beginners first need to understand keys, recovery, and custody tradeoffs before deciding what setup fits them best.",
      },
      {
        question: "What is the biggest wallet mistake beginners make?",
        answer:
          "Treating the wallet like a normal app account instead of understanding that keys and recovery phrases are the real source of access.",
      },
    ],
  },
];

export function getPublicGuide(id: PublicGuide["id"]) {
  return publicGuides.find((guide) => guide.id === id);
}
