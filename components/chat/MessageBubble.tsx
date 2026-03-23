import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-7",
        message.role === "assistant"
          ? "surface text-[var(--foreground)]"
          : "ml-auto bg-[var(--surface-dark)] text-white",
      )}
    >
      {message.content}
    </div>
  );
}
