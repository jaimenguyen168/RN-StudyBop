import { Alert } from "react-native";
import React from "react";
import { signOut } from "@/libs/firebase";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/home/Header";
import NoCourses from "@/components/home/NoCourses";

const Home = () => {
  const handleSignOut = async () => {
    const result = await signOut();

    if (result.success) {
      router.replace("/(auth)/onboarding");
    } else {
      Alert.alert("Error", result.error);
    }
  };

  return (
    <SafeAreaView className="flex justify-center px-8">
      <Header />
      <NoCourses />
    </SafeAreaView>
  );
};
export default Home;
