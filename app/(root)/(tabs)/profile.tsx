import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/ui/Button";
import { signOut } from "@/libs/firebase";

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center">
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
