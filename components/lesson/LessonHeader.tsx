import type { Lesson } from "@/types/lesson";

export function LessonHeader({ lesson }: { lesson: Lesson }) {
  return (
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
        Lesson {lesson.order}
      </p>
      <h1 className="text-4xl font-black tracking-tight">{lesson.title}</h1>
      <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">{lesson.summary}</p>
    </header>
  );
}
