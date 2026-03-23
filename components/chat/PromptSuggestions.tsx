"use client";

const suggestions = [
  "Why is Bitcoin scarce?",
  "How do wallets work?",
  "What is the difference between Bitcoin and fiat money?",
];

export function PromptSuggestions({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          className="rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-medium text-[var(--muted)] transition-colors hover:border-amber-700/25 hover:bg-amber-50"
          onClick={() => onSelect(suggestion)}
          type="button"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
