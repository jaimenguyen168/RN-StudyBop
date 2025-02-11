import { auth } from "@/configs/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";

interface SuccessResult<T> {
  success: true;
  data: T;
}

interface ErrorResult {
  success: false;
  error: string;
}

type Result<T = any> = SuccessResult<T> | ErrorResult;

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
