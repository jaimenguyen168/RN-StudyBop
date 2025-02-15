import { Course } from "@/types/type";
import { PracticeOption, PracticePath } from "@/constants/options";
import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const PracticeItem = ({
  course,
  option,
  index,
}: {
  course: Course;
  option: PracticeOption;
  index: number;
}) => {
  const { icon, path } = option;

  const renderItemByPath = (course: Course, index: number) => {
    switch (path) {
      case PracticePath.QUIZ:
      case PracticePath.FLASHCARDS:
      case PracticePath.QA:
      default:
        return null;
    }
  };

  return (
    <View
      className={`flex-1 flex items-center mt-8 rounded-3xl gap-2 p-4 mx-5 bg-white shadow-xl shadow-gray-200 ${
        index % 2 === 0 ? "ml-12" : "mr-12"
      }`}
    >
      <Image
        source={icon as any}
        className="w-full h-[100px]"
        resizeMode="contain"
      />
      <Text className="font-rubikLight text-sm text-center" numberOfLines={2}>
        {course.courseTitle}
      </Text>

      <View className="absolute top-2 right-2">
        <Ionicons name="checkmark-circle" size={24} color="#999" />
      </View>
    </View>
  );
};

export default PracticeItem;
