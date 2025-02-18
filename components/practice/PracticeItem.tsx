import { Course, Quiz } from "@/types/type";
import { PracticeOption, PracticePath } from "@/constants/options";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import QuizModal from "@/components/practice/QuizModal";

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
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = () => {
    setModalVisible(true);
  };

  return (
    <View className="w-1/2 p-2">
      <TouchableOpacity
        onPress={handleItemPress}
        className={`items-center mt-8 rounded-3xl gap-3 p-4 mx-4 bg-white shadow-xl shadow-gray-200 ${
          index % 2 === 0 ? "ml-10" : "mr-10"
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

        <Text className="text-primary font-rubikMedium">
          {course.correctCount}/{course.quiz.length}
        </Text>

        <View className="absolute top-2 right-2">
          <Ionicons name="checkmark-circle" size={24} color={"#999"} />
        </View>
      </TouchableOpacity>

      <QuizModal
        course={course}
        path={option.path}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default PracticeItem;
