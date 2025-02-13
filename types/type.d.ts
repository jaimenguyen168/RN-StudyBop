interface Course {
  id: string;
  banner_image: string;
  category: string;
  chapters: any[];
  courseTitle: string;
  description: string;
  flashcards: any[];
  qa: any[];
  quiz: any[];

  userId: string;
  dateCreated: Date;
}

export type { Course };
