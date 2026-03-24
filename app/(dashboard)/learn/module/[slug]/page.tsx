import Link from "next/link";
import { notFound } from "next/navigation";

import { getModuleBySlug } from "@/lib/lessons";

export default async function LearnModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentModule = getModuleBySlug(slug);

  if (!currentModule) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/learn"
            className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            Back to curriculum
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-zinc-500">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-orange-300">
              Module {String(currentModule.order).padStart(2, "0")}
            </span>
            <span>{currentModule.lessons.length} lessons</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {currentModule.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
            {currentModule.description}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-4">
            {currentModule.lessons.map((lesson, index) => (
              <div
                key={lesson.slug}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Lesson {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    {lesson.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
                    {lesson.summary}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <span className="text-sm text-zinc-500">{lesson.duration}</span>
                  <Link
                    href={`/learn/${lesson.slug}`}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
                  >
                    Open lesson
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
