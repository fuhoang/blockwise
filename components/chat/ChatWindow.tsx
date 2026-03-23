"use client";

import { useChat } from "@/hooks/useChat";

import { ChatInput } from "@/components/chat/ChatInput";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { PromptSuggestions } from "@/components/chat/PromptSuggestions";
import { Card } from "@/components/ui/Card";

export function ChatWindow() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">AI Tutor</p>
          <p className="text-xs text-[var(--muted)]">Ask for analogies, explanations, and quick checks.</p>
        </div>
      </div>
      <div className="mb-4 flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      <div className="mb-4">
        <PromptSuggestions onSelect={sendMessage} />
      </div>
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </Card>
  );
}
