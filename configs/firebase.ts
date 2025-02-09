// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "studybop-a7a42.firebaseapp.com",
  projectId: "studybop-a7a42",
  storageBucket: "studybop-a7a42.firebasestorage.app",
  messagingSenderId: "247061978497",
  appId: "1:247061978497:web:659a95866aa7f462dd1c80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
