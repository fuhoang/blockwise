import Link from "next/link";

import { ProgressBar } from "@/components/lesson/ProgressBar";
import { lessonConfig } from "@/content/config";

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <section className="surface rounded-[2rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Curriculum
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Learn the foundations in sequence</h1>
        <div className="mt-6">
          <ProgressBar value={40} />
        </div>
      </section>
      <section className="grid gap-5">
        {lessonConfig.map((lesson) => (
          <Link key={lesson.slug} href={`/lesson/${lesson.slug}`} className="surface rounded-3xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Lesson {lesson.order}</p>
                <h2 className="mt-2 text-2xl font-bold">{lesson.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">{lesson.summary}</p>
              </div>
              <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-[var(--accent-strong)]">
                {lesson.duration}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
