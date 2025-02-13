import { auth, db } from "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { Result } from "@/types/util";
import { Course } from "@/types/type";
import { addDoc, collection } from "@firebase/firestore";

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
