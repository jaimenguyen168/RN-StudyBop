import images from "@/constants/images";

export const practiceOptions = [
  {
    name: "Quiz",
    image: images.quizTime,
    icon: images.quiz,
    path: "/quiz",
  },
  {
    name: "Flashcards",
    image: images.flashcard,
    icon: images.layers,
    path: "/flashcards",
  },
  {
    name: "Q&A",
    image: images.notes,
    icon: images.qa,
    path: "/questionAnswer",
  },
];

export const imageAssets = {
  "/banner1.png": images.banner1,
  "/banner3.png": images.banner2,
  "/banner2.png": images.banner3,
  "/banner4.png": images.banner4,
  "/banner5.png": images.banner5,
};

export const CourseCategory = [
  "Tech & Coding",
  "Business & Finance",
  "Health & Fitness",
  "Science & Engineering",
  "Arts & Creativity",
];

export const ProfileMenu = [
  {
    name: "Add Course",
    icon: "add-outline", //Ionic Icons
    path: "/addCourse",
  },
  {
    name: "My Course",
    icon: "book", //Ionic Icons
    path: "/(tabs)/home",
  },
  {
    name: "Course Progress",
    icon: "analytics-outline", //Ionic Icons
    path: "/(tabs)/progress",
  },
  {
    name: "My Subscription",
    icon: "shield-checkmark", //Ionic Icons
    path: "",
  },
  {
    name: "Logout",
    icon: "log-out", //Ionic Icons
    path: "/login",
  },
];
