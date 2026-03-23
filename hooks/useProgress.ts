"use client";

import { useMemo, useState } from "react";

export function useProgress(totalLessons = 5) {
  const [completed, setCompleted] = useState<string[]>(["what-is-money"]);

  const percentage = useMemo(
    () => Math.round((completed.length / totalLessons) * 100),
    [completed.length, totalLessons],
  );

  function markComplete(slug: string) {
    setCompleted((current) =>
      current.includes(slug) ? current : [...current, slug],
    );
  }

  return { completed, percentage, markComplete };
}
