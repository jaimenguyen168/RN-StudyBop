import { Course, Flashcard, QA, Quiz } from "@/types/type";
import { PracticeOption, PracticePath } from "@/constants/options";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import QuizModal from "@/components/practice/QuizModal";
import FlashcardModal from "@/components/practice/FlashcardModal";
import QAndAModal from "@/components/practice/QAndAModal";

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

        {path === PracticePath.QUIZ && (
          <Text
            className={`font-rubikMedium ${
              course.correctCount === 0
                ? "text-ink-darkGray"
                : course.correctCount === course.quiz.length
                  ? "text-success"
                  : "text-primary"
            }`}
          >
            {course.correctCount}/{course.quiz.length}
          </Text>
        )}

        <View className="absolute top-2 right-2">
          <Ionicons name="checkmark-circle" size={24} color={"#999"} />
        </View>
      </TouchableOpacity>

      {path === PracticePath.QUIZ ? (
        <QuizModal
          course={course}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : path === PracticePath.FLASHCARDS ? (
        <FlashcardModal
          course={course}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : (
        <QAndAModal
          course={course}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

export default PracticeItem;
