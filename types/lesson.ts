export interface LessonMeta {
  slug: string;
  title: string;
  summary: string;
  duration: string;
  order: number;
}

export interface Lesson extends LessonMeta {
  body: string;
}
