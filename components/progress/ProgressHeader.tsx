import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";

const ProgressHeader = () => {
  return (
    <View className="flex-row items-center w-full justify-between px-8 py-4">
      <View className="flex gap-1">
        <Text className="text-2xl font-rubikSemiBold text-ink-light">
          Your Progress
        </Text>
        <Text className="text-lg font-rubikMedium">Let's review</Text>
      </View>

      <TouchableOpacity onPress={() => {}} className="p-2 -mr-2 bg-transparent">
        <Octicons name="gear" size={28} color="#1E3A8A" />
      </TouchableOpacity>
    </View>
  );
};
export default ProgressHeader;
