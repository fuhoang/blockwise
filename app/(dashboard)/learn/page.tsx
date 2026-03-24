import Link from "next/link";

import { lessonConfig, moduleConfig } from "@/content/config";

export default function LearnPage() {
  const totalLessons = lessonConfig.length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm text-zinc-500">Curriculum</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Start learning Bitcoin step by step.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            A simple learning path for beginners who want clear explanations,
            steady progress, and a better understanding of Bitcoin.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-sm text-zinc-400">Progress</p>
              <p className="mt-1 text-lg font-semibold text-white">
                0 of {totalLessons} lessons completed
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-sm text-zinc-400">Level</p>
              <p className="mt-1 text-lg font-semibold text-white">Beginner</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {moduleConfig.map((module) => (
              <article
                key={module.slug}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-sm text-zinc-500">
                  Module {String(module.order).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {module.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {module.description}
                </p>
                <div className="mt-6 space-y-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                    {module.lessons.length} lessons
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  {module.lessons.map((lesson, index) => (
                    <div
                      key={lesson.slug}
                      className="rounded-2xl border border-white/10 px-4 py-3"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        Lesson {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-sm font-medium text-zinc-200">
                        {lesson.title}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/learn/module/${module.slug}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
                >
                  Open module
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-sm text-zinc-500">Ready to begin?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start with the first lesson.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-400">
              The best place to begin is with the basics. Build a strong
              foundation first, then move deeper as you go.
            </p>
            <Link
              href="/learn/what-is-money"
              className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
            >
              Open &ldquo;What is Money?&rdquo;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
