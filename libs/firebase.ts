import { auth, db } from "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { Result } from "@/types/util";
import { Chapter, Course } from "@/types/type";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "@firebase/firestore";

const getUid = () => auth.currentUser?.uid;

const collectionRef = {
  users: "users",
  courses: "courses",
};

const subCollectionRef = {
  progress: "progress",
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
): Promise<Result> => {
  console.log("signUp", name, email, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(userCredential.user, { displayName: name });

    console.log("userCredential", userCredential);

    return {
      success: true,
      data: userCredential.user,
    };
  } catch (error: any) {
    console.log("error", error);
    return {
      success: false,
      error: `${error.code} ${error.message}`,
    };
  }
};

export const signIn = async (
  email: string,
  password: string,
): Promise<Result> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return {
      success: true,
      data: userCredential.user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: `${error.code} ${error.message}`,
    };
  }
};

export const signOut = async (): Promise<Result> => {
  try {
    await auth.signOut();
    return {
      success: true,
      data: "Logged out successfully",
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: `${error.code} ${error.message}`,
    };
  }
};

export const saveCourses = async (courses: Course[]): Promise<Result> => {
  const uid = getUid();
  if (!uid) {
    return {
      success: false,
      error: "User not logged in",
    };
  }

  try {
    const saveAll = courses.map((course) =>
      addDoc(collection(db, collectionRef.courses), {
        ...course,
        userId: uid,
        dateCreated: new Date(),
      }),
    );

    await Promise.all(saveAll);

    return {
      success: true,
      data: "Saved all courses successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      error: `${error.code} ${error.message}`,
    };
  }
};

export const listenToCourses = (
  fetchAll: boolean = true,
  callback: (result: Result<Course[]>) => void,
) => {
  const uid = getUid();
  if (!uid && !fetchAll) {
    return {
      success: false,
      error: "User not logged in",
    };
  }

  const courseQuery = fetchAll
    ? query(collection(db, collectionRef.courses))
    : query(collection(db, collectionRef.courses), where("userId", "==", uid));

  return onSnapshot(
    courseQuery,
    async (querySnapshot) => {
      const courses: Course[] = [];

      // Fetch all course data along with its fields directly in the document
      const fetchCoursesWithDetails = querySnapshot.docs.map((doc) => {
        const courseData = doc.data();

        return {
          id: doc.id,
          ...courseData,
          // banner_image: courseData.banner_image || "",
          // category: courseData.category || "",
          // courseTitle: courseData.courseTitle || "",
          // description: courseData.description || "",
          // userId: courseData.userId || "",
          // dateCreated: courseData.dateCreated.toDate(),
          // chapters: courseData.chapters || [],
          // flashcards: courseData.flashcards || [],
          // qa: courseData.qa || [],
          // quiz: courseData.quiz || [],
        } as Course;
      });

      const result = await Promise.all(fetchCoursesWithDetails);
      courses.push(...result);

      callback({ success: true, data: courses });
    },
    (error: any) => {
      callback({ success: false, error: error.message });
    },
  );
};

export const listenToCourseById = (
  courseId: string,
  callback: (result: Result<Course | null>) => void,
) => {
  if (!courseId) {
    callback({ success: false, error: "Course ID is required" });
    return () => {};
  }

  const courseRef = doc(db, collectionRef.courses, courseId);
  const progressRef = doc(
    db,
    `${collectionRef.users}/${getUid()}/${subCollectionRef.progress}/${courseId}`,
  );

  return onSnapshot(
    courseRef,
    async (docSnapshot) => {
      if (!docSnapshot.exists()) {
        callback({ success: false, error: "Course not found" });
        return;
      }

      const courseData = docSnapshot.data();

      const progressSnapshot = await getDoc(progressRef);
      const completedChapters = progressSnapshot.exists()
        ? progressSnapshot.data() || {}
        : {};

      const updatedChapters = courseData.chapters.map((chapter: Chapter) => ({
        ...chapter,
        isCompleted: completedChapters[chapter.chapterName] || false,
      })) as Chapter[];

      const course: Course = {
        id: docSnapshot.id,
        ...courseData,
        chapters: updatedChapters,
      } as Course;

      callback({ success: true, data: course });
    },
    (error) => {
      callback({ success: false, error: error.message });
    },
  );
};

export const markChapterCompleted = async (
  courseId: string,
  chapterName: string,
): Promise<Result> => {
  const uid = getUid();
  if (!uid) return { success: false, error: "User not logged in" };

  try {
    const completionRef = doc(
      db,
      `${collectionRef.users}/${uid}/${subCollectionRef.progress}/${courseId}`,
    );
    await setDoc(completionRef, { [chapterName]: true }, { merge: true });

    return {
      success: true,
      data: `You have completed chapter '${chapterName}'.`,
    };
  } catch (error: any) {
    return { success: false, error: `${error.code} ${error.message}` };
  }
};
