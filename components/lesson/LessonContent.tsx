import type { Lesson } from "@/types/lesson";

export function LessonContent({ lesson }: { lesson: Lesson }) {
  const paragraphs = lesson.body.split("\n\n");

  return (
    <article className="surface rounded-3xl p-8">
      <div className="max-w-none">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-5 text-base leading-8 text-[var(--foreground)]">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
