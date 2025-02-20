import images from "@/constants/images";

export enum PracticePath {
  QUIZ = "quiz",
  FLASHCARDS = "flashcards",
  QA = "Q&A",
}

export interface PracticeOption {
  name: string;
  image: any;
  icon: string;
  path: PracticePath;
}

export const practiceOptions = [
  {
    name: "Quiz",
    image: images.quizTime,
    icon: images.quiz,
    path: PracticePath.QUIZ,
  },
  {
    name: "Flashcards",
    image: images.flashcard,
    icon: images.layers,
    path: PracticePath.FLASHCARDS,
  },
  {
    name: "Q&A",
    image: images.notes,
    icon: images.qa,
    path: PracticePath.QA,
  },
];

export const imageAssets = {
  "/banner1.png": images.banner1,
  "/banner2.png": images.banner2,
  "/banner3.png": images.banner3,
  "/banner4.png": images.banner4,
  "/banner5.png": images.banner5,
  "/banner6.png": images.banner6,
};

export const courseCategory = [
  "Tech & Coding",
  "Business & Finance",
  "Health & Fitness",
  "Science & Engineering",
  "Arts & Creativity",
];

export enum ProfilePath {
  CREATE_COURSE = "createCourse",
  MY_COURSES = "myCourses",
  COURSE_PROGRESS = "courseProgress",
  MY_SUBSCRIPTIONS = "mySubscriptions",
  LOGOUT = "logout",
}

export const profileMenu = [
  {
    name: "Create a Course",
    icon: "add-outline",
    path: ProfilePath.CREATE_COURSE,
  },
  {
    name: "My Courses",
    icon: "book",
    path: ProfilePath.MY_COURSES,
  },
  {
    name: "Course Progress",
    icon: "analytics-outline",
    path: ProfilePath.COURSE_PROGRESS,
  },
  {
    name: "My Subscriptions",
    icon: "shield-checkmark",
    path: ProfilePath.MY_SUBSCRIPTIONS,
  },
  {
    name: "Logout",
    icon: "log-out",
    path: ProfilePath.LOGOUT,
  },
];
