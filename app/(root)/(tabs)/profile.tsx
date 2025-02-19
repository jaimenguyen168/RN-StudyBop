import { View, Text, Image, Alert } from "react-native";
import React from "react";
import { signOut } from "@/libs/firebase";
import { useAuthContext } from "@/contexts/firebase-auth";
import images from "@/constants/images";
import { profileMenu, ProfilePath } from "@/constants/options";
import ProfileRowItem from "@/components/profile/ProfileRowItem";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useAuthContext();

  const handleItemPress = async (path: ProfilePath) => {
    switch (path) {
      case ProfilePath.LOGOUT: {
        await handleSignOut();
      }
    }
  };

  const handleSignOut = async () => {
    const result = await signOut();

    if (result.success) {
      router.replace("/(auth)/login");
      Alert.alert("Success", result.data);
    } else {
      Alert.alert("Error", result.error);
    }
  };

  return (
    <View className="flex-1">
      <View className="justify-center px-8 mt-20">
        <Text className="text-4xl font-rubikSemiBold ">Profile</Text>
      </View>

      <View className="flex items-center">
        <Image source={images.icon} className="size-56" />

        <Text className="font-rubikBold text-2xl">{user?.displayName}</Text>
        <Text className="font-rubikLight text-ink-darkGray text-xl">
          {user?.email}
        </Text>
      </View>

      <View className="flex w-full items-center justify-center gap-6 px-8 mt-8">
        {profileMenu.map((item) => (
          <ProfileRowItem
            key={item.name}
            icon={
              <Ionicons name={item.icon as any} size={28} color="#E3562A" />
            }
            title={item.name}
            onPress={() => handleItemPress(item.path)}
          />
        ))}
      </View>
    </View>
  );
};
export default Profile;
