import { ChatWindow } from "@/components/chat/ChatWindow";

export function DemoChat() {
  return (
    <section className="px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Live demo
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight">See the tutor in action</h2>
      </div>
      <ChatWindow />
    </section>
  );
}
