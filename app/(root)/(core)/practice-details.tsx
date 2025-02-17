import { View, Text, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import images from "@/constants/images";

const PracticeDetails = () => {
  const { path, courseId } = useLocalSearchParams();

  return (
    <View className="flex-1 flex justify-center">
      <Image source={images.wave} className="h-screen absolute top-0" />
      <Text>
        {path} {courseId}
      </Text>
    </View>
  );
};
export default PracticeDetails;
