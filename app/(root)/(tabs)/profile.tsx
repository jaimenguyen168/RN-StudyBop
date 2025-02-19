import { View, Text, Image } from "react-native";
import React from "react";
import Button from "@/components/ui/Button";
import { signOut } from "@/libs/firebase";
import NoCourses from "@/components/home/NoCourses";
import { useAuthContext } from "@/contexts/firebase-auth";
import images from "@/constants/images";
import { profileMenu } from "@/constants/options";
import ProfileRowItem from "@/components/profile/ProfileRowItem";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const { user } = useAuthContext();

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
            icon={
              <Ionicons name={item.icon as any} size={28} color="#E3562A" />
            }
            title={item.name}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
};
export default Profile;
