import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/ui/Button";
import { signOut } from "@/libs/firebase";
import NoCourses from "@/components/home/NoCourses";

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <NoCourses />
      <Button
        title="Logout"
        onPress={async () => {
          await signOut();
        }}
      />
    </View>
  );
};
export default Profile;
