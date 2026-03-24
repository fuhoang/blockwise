"use client";

import { useMemo, useState } from "react";

import type { LessonMeta } from "@/types/lesson";
import type { QuizQuestion } from "@/types/quiz";

import { LessonNavigation } from "@/components/lesson/LessonNavigation";
import { QuizCard } from "@/components/quiz/QuizCard";
import { QuizResult } from "@/components/quiz/QuizResult";
import { Button } from "@/components/ui/Button";

type LessonQuizGateProps = {
  questions: QuizQuestion[];
  previous: LessonMeta | null;
  next: LessonMeta | null;
};

export function LessonQuizGate({
  questions,
  previous,
  next,
}: LessonQuizGateProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [passed, setPassed] = useState(false);

  const correctCount = useMemo(
    () =>
      questions.filter((question) => answers[question.id] === question.correctAnswer)
        .length,
    [answers, questions],
  );

  const allAnswered = questions.every((question) => Boolean(answers[question.id]));

  function handleSelect(questionId: string, answer: string) {
    setAnswers((current) => ({ ...current, [questionId]: answer }));
    setChecked(false);
    setPassed(false);
  }

  function handleCheckAnswers() {
    const allCorrect = questions.every(
      (question) => answers[question.id] === question.correctAnswer,
    );

    setChecked(true);
    setPassed(allCorrect);
  }

  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Lesson quiz
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Answer every question correctly to unlock the next lesson.
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Each lesson includes a short multiple-choice check so the learner has
            to confirm understanding before moving forward.
          </p>
        </div>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <QuizCard
              key={question.id}
              checked={checked}
              index={index + 1}
              onSelect={(answer) => handleSelect(question.id, answer)}
              question={question}
              selected={answers[question.id] ?? null}
            />
          ))}
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <Button
            className="w-full bg-orange-500 !text-black hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            disabled={!allAnswered}
            onClick={handleCheckAnswers}
            type="button"
            variant="primary"
          >
            {passed
              ? "Quiz passed"
              : allAnswered
                ? "Check answers"
                : `Answer all ${questions.length} questions`}
          </Button>
        </div>
      </section>

      <QuizResult correct={correctCount} passed={passed} total={questions.length} />
      <LessonNavigation canProceed={passed} next={next} previous={previous} />
    </div>
  );
}
