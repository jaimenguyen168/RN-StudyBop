import { Image, Text, View } from "react-native";
import images from "@/constants/images";
import Button from "@/components/ui/Button";
import React from "react";
import { router } from "expo-router";

const NoCourses = () => {
  const handleAddCoursePress = () => {
    router.push("/(root)/(core)/add");
  };

  return (
    <View className="flex items-center justify-center py-16 gap-12">
      <View className="gap-2 items-center">
        <Image source={images.book} className="size-64" resizeMode="contain" />
        <Text className="font-rubikSemiBold text-3xl text-center">
          You have no courses
        </Text>
      </View>

      <View className="flex w-full gap-6">
        <Button
          title="+ Generate a course by AI"
          onPress={handleAddCoursePress}
        />
        <Button
          title="Explore existing courses"
          buttonStyle="bg-white"
          textStyle="text-primary text-xl"
        />
      </View>
    </View>
  );
};

export default NoCourses;
