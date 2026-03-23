"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

export function ChatInput({
  onSend,
  isLoading,
}: {
  onSend: (value: string) => Promise<void>;
  isLoading: boolean;
}) {
  const [value, setValue] = useState("");

  async function handleSubmit() {
    if (!value.trim() || isLoading) {
      return;
    }

    const message = value;
    setValue("");
    await onSend(message);
  }

  return (
    <div className="space-y-3">
      <textarea
        className="surface min-h-28 w-full rounded-3xl p-4 text-sm outline-none"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask the tutor to explain a lesson, compare concepts, or quiz you."
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Thinking..." : "Send Question"}
        </Button>
      </div>
    </div>
  );
}
