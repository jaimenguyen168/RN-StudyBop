import { auth, db } from "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { Result } from "@/types/util";
import { Course } from "@/types/type";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "@firebase/firestore";

const getUid = () => auth.currentUser?.uid;

const collectionRef = {
  courses: "courses",
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

  const unsubscribe = onSnapshot(
    courseQuery,
    async (querySnapshot) => {
      const courses: Course[] = [];

      // Fetch all course data along with its fields directly in the document
      const fetchCoursesWithDetails = querySnapshot.docs.map((doc) => {
        const courseData = doc.data();

        const course: Course = {
          id: doc.id,
          banner_image: courseData.banner_image || "",
          category: courseData.category || "",
          courseTitle: courseData.courseTitle || "",
          description: courseData.description || "",
          userId: courseData.userId || "",
          dateCreated: courseData.dateCreated.toDate(),
          chapters: courseData.chapters || [],
          flashcards: courseData.flashcards || [],
          qa: courseData.qa || [],
          quiz: courseData.quiz || [],
        };

        return course;
      });

      const result = await Promise.all(fetchCoursesWithDetails);
      courses.push(...result);

      callback({ success: true, data: courses });
    },
    (error: any) => {
      callback({ success: false, error: error.message });
    },
  );

  return unsubscribe;
};
