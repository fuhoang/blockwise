import { readFileSync } from "node:fs";
import path from "node:path";

import { lessonConfig } from "@/content/config";
import type { Lesson } from "@/types/lesson";

const lessonsDir = path.join(process.cwd(), "content", "lessons");

function stripFrontmatter(source: string) {
  return source.replace(/^---[\s\S]*?---\n*/, "").trim();
}

export function getLessons() {
  return [...lessonConfig].sort((a, b) => a.order - b.order);
}

export function getLessonBySlug(slug: string): Lesson | null {
  const meta = lessonConfig.find((lesson) => lesson.slug === slug);

  if (!meta) {
    return null;
  }

  const source = readFileSync(path.join(lessonsDir, `${slug}.mdx`), "utf8");

  return {
    ...meta,
    body: stripFrontmatter(source),
  };
}

export function getAdjacentLessons(slug: string) {
  const lessons = getLessons();
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  return {
    previous: index > 0 ? lessons[index - 1] : null,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}
