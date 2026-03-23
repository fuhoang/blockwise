"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function QuizCard() {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    "Bitcoin is valuable because it is easy to create.",
    "Bitcoin is valuable because supply is predictable and verification is open.",
    "Bitcoin is valuable because banks can print more of it when demand rises.",
  ];

  return (
    <Card className="p-6">
      <p className="text-sm font-semibold text-[var(--muted)]">Quick Check</p>
      <h3 className="mt-2 text-xl font-bold">Which statement best explains Bitcoin scarcity?</h3>
      <div className="mt-5 space-y-3">
        {options.map((option) => (
          <button
            key={option}
            className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
              selected === option
                ? "border-amber-700/30 bg-amber-50"
                : "border-black/10 bg-white/80 hover:bg-black/5"
            }`}
            onClick={() => setSelected(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <Button variant="secondary">
          {selected === options[1] ? "Correct answer selected" : "Select an answer"}
        </Button>
      </div>
    </Card>
  );
}
