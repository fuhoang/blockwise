import { tutorSystemPrompt } from "@/lib/prompts";

export async function createTutorReply(message: string) {
  const cleaned = message.trim();

  if (!cleaned) {
    return "Ask about Bitcoin, money, wallets, or transactions and I will break it down step by step.";
  }

  const primer =
    "Bitcoin is easiest to learn when you connect the idea to ownership, scarcity, and how value moves on the internet.";
  const nextStep =
    "A strong next step is to compare Bitcoin to bank-ledgers and then look at how wallets hold keys instead of coins.";

  return `${primer}\n\nYou asked: "${cleaned}"\n\n${nextStep}\n\nSystem frame: ${tutorSystemPrompt.trim()}`;
}
