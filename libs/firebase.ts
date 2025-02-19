import { auth, db } from "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { Result } from "@/types/util";
import { Chapter, Course, UserProgress } from "@/types/type";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "@firebase/firestore";
import { subDays, format } from "date-fns";

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

export const createCourses = async (courses: Course[]): Promise<Result> => {
  const uid = getUid();
  if (!uid) {
    return {
      success: false,
      error: "User not logged in",
    };
  }

  try {
    const saveAll = courses.map(async (course) => {
      const courseRef = await addDoc(collection(db, collectionRef.courses), {
        ...course,
        userId: uid,
        dateCreated: new Date(),
        lastUpdated: new Date(),
      });

      setDoc(
        doc(
          db,
          `${collectionRef.users}/${uid}/${subCollectionRef.progress}/${courseRef.id}`,
        ),
        {},
      ).catch((error) => console.error("Error setting progress:", error));

      return courseRef.id;
    });

    await Promise.all(saveAll);

    return {
      success: true,
      data: "Saved all courses successfully",
    };
  } catch (error: any) {
    console.log(error);
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

      const fetchCoursesWithDetails = querySnapshot.docs.map((doc) => {
        const courseData = doc.data();

        return {
          id: doc.id,
          ...courseData,
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

export const addCourseForUser = async (course: Course): Promise<Result> => {
  const uid = getUid();
  if (!uid) {
    return {
      success: false,
      error: "User not logged in",
    };
  }

  try {
    await setDoc(
      doc(
        db,
        `${collectionRef.users}/${uid}/${collectionRef.courses}/${course.id}`,
      ),
      {
        ...course,
        correctCount: 0,
        lastUpdated: serverTimestamp(),
      },
    );
    return {
      success: true,
      data: "Added course successfully",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: `${error.code} ${error.message}`,
    };
  }
};

export const listenToCourseById = (
  courseId: string,
  callback: (
    result: Result<{ course: Course | null; source: "user" | "courses" }>,
  ) => void,
) => {
  const uid = getUid();
  if (!uid) {
    callback({ success: false, error: "User not logged in" });
  }

  const userCourseRef = doc(
    db,
    `${collectionRef.users}/${uid}/${collectionRef.courses}/${courseId}`,
  );
  const courseRef = doc(db, `${collectionRef.courses}/${courseId}`);

  return onSnapshot(
    userCourseRef,
    async (userDocSnapshot) => {
      if (userDocSnapshot.exists()) {
        const userCourseData = userDocSnapshot.data();

        const userCourse: Course = {
          id: userDocSnapshot.id,
          ...userCourseData,
        } as Course;

        callback({
          success: true,
          data: { course: userCourse, source: "user" },
        });
      } else {
        return onSnapshot(
          courseRef,
          (courseDocSnapshot) => {
            if (!courseDocSnapshot.exists()) {
              callback({ success: false, error: "Course not found" });
              return;
            }

            const courseData = courseDocSnapshot.data();

            const course: Course = {
              id: courseDocSnapshot.id,
              ...courseData,
            } as Course;

            callback({ success: true, data: { course, source: "courses" } });
          },
          (error) => {
            callback({ success: false, error: error.message });
          },
        );
      }
    },
    (error) => {
      callback({ success: false, error: error.message });
    },
  );
};

export const listenToProgressCourses = (
  callback: (result: Result<Course[]>) => void,
) => {
  const uid = getUid();
  if (!uid) {
    callback({
      success: false,
      error: "User not logged in",
    });
  }

  const userCoursesRef = collection(
    db,
    `${collectionRef.users}/${uid}/${collectionRef.courses}`,
  );

  return onSnapshot(
    userCoursesRef,
    async (userCoursesSnapshot) => {
      if (userCoursesSnapshot.empty) {
        callback({ success: true, data: [] });
        return;
      }

      const courses = userCoursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[];

      callback({ success: true, data: courses });
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
    const userCourseRef = doc(
      db,
      `${collectionRef.users}/${uid}/${collectionRef.courses}/${courseId}`,
    );

    const courseSnapshot = await getDoc(userCourseRef);
    if (!courseSnapshot.exists())
      return { success: false, error: "Course not found" };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const localDate = today.toISOString().slice(0, 10);
    const progressRef = doc(
      db,
      `${collectionRef.users}/${uid}/${subCollectionRef.progress}/${localDate}`,
    );

    const batch = writeBatch(db);

    batch.update(userCourseRef, {
      chapters: courseSnapshot
        .data()
        .chapters.map((chapter: Chapter) =>
          chapter.chapterName === chapterName
            ? { ...chapter, isCompleted: true }
            : chapter,
        ),
      lastUpdated: serverTimestamp(),
    });

    batch.set(
      progressRef,
      { chapterCount: increment(1), lastUpdated: serverTimestamp() },
      { merge: true },
    );

    await batch.commit();

    return {
      success: true,
      data: `You have completed chapter '${chapterName}'.`,
    };
  } catch (error: any) {
    return { success: false, error: `${error.code} ${error.message}` };
  }
};

export const listenToLast7DaysProgress = (
  callback: (result: Result<UserProgress[]>) => void,
) => {
  const uid = getUid();
  if (!uid) return;

  const progressRef = collection(db, `${collectionRef.users}/${uid}/progress`);

  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    format(subDays(today, 6 - i), "yyyy-MM-dd"),
  );

  const q = query(
    progressRef,
    where("__name__", ">=", last7Days[0]), // Start from the earliest date in range
    orderBy("__name__", "asc"),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const progressMap: Record<string, number> = {};

      snapshot.forEach((doc) => {
        progressMap[doc.id] = doc.data().chapterCount || 0;
      });

      const progress: UserProgress[] = last7Days.map((date) => ({
        date,
        chapterCount: progressMap[date] || 0,
      }));

      callback({ success: true, data: progress });
    },
    (error) => {
      callback({ success: false, error: error.message });
    },
  );
};

export const submitQuiz = async (
  courseId: string,
  correctNumber: number,
): Promise<Result> => {
  const uid = getUid();
  if (!uid) return { success: false, error: "User not logged in" };

  try {
    const courseRef = doc(
      db,
      `${collectionRef.users}/${uid}/${collectionRef.courses}/${courseId}`,
    );

    await updateDoc(courseRef, {
      correctCount: correctNumber,
      lastUpdated: serverTimestamp(),
    });

    return { success: true, data: `Quiz submitted successfully.` };
  } catch (error: any) {
    return { success: false, error: `${error.code} ${error.message}` };
  }
};
