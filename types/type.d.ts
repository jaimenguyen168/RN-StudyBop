import { Timestamp } from "@firebase/firestore";

interface Content {
  topic: string;
  explain: string;
  code?: string | null;
  example?: string | null;
}

interface Chapter {
  chapterName: string;
  content: Content[];
  isCompleted: boolean;
}

interface Flashcard {
  front: string;
  back: string;
}

interface QA {
  question: string;
  answer: string;
}

interface Quiz {
  question: string;
  options: string[];
  correctAns: string;
}

interface Course {
  id: string;
  banner_image: string;
  category: string;
  chapters: Chapter[];
  courseTitle: string;
  description: string;
  flashcards: Flashcard[];
  qa: QA[];
  quiz: Quiz[];

  userId: string;
  dateCreated: Timestamp;
  lastUpdated?: Timestamp;
}

export type { Course, Chapter, Content };
