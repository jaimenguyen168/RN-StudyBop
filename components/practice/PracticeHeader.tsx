import { PracticeOption } from "@/constants/options";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const PracticeHeader = ({
  name,
  image,
}: Omit<PracticeOption, "path" | "icon">) => {
  return (
    <View className="flex bg-white items-center justify-center">
      <Image source={image} className="w-screen h-[280px]" resizeMode="cover" />
      <View className="absolute top-16 left-8 flex-row items-center gap-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className=" bg-black/20 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <Text className="text-white font-rubikExtraBold text-3xl">{name}</Text>
      </View>
    </View>
  );
};

export default PracticeHeader;
