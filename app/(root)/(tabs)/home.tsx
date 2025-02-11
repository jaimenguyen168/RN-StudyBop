import { View, Text, Alert } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { signOut } from "@/libs/firebase";
import { router } from "expo-router";

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
    <View className="flex flex-1 items-center justify-center">
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};
export default Home;
