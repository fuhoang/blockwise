import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Sequenced curriculum",
    description: "Lessons move from monetary foundations to self-custody and security in a deliberate order.",
  },
  {
    title: "AI tutor",
    description: "Ask follow-up questions in plain language and get explanations built for beginners.",
  },
  {
    title: "Progress tracking",
    description: "See what you finished, what is next, and where concepts still need reinforcement.",
  },
];

export function Features() {
  return (
    <section className="px-6 py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Features
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight">A focused Bitcoin learning stack</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6">
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
