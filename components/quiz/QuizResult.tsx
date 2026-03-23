import { Card } from "@/components/ui/Card";

export function QuizResult() {
  return (
    <Card className="p-6">
      <p className="text-sm font-semibold text-[var(--success)]">Result</p>
      <p className="mt-2 text-base leading-7 text-[var(--muted)]">
        Scarcity matters because users can trust the supply rules in advance instead of relying on a central issuer to stay disciplined.
      </p>
    </Card>
  );
}
