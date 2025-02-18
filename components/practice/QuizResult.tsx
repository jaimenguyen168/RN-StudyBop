import { View, Text, Image, FlatList, ScrollView } from "react-native";
import React from "react";
import images from "@/constants/images";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Button from "@/components/ui/Button";

export interface QuizResultProps {
  quizResult: { question: string; answer: string; isCorrect: boolean }[];
  onClose: () => void;
}

const QuizResult = ({ quizResult, onClose }: QuizResultProps) => {
  const quizLength = quizResult.length;
  const correctNumber = quizResult.filter((result) => result.isCorrect).length;
  const incorrectNumber = quizLength - correctNumber;

  const passingRate = (correctNumber / quizLength) * 100;
  const isPassed = passingRate >= 60;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={images.wave} className="h-screen w-full absolute top-0" />
      <View className="flex items-center pt-24 px-12">
        <Text className="text-center text-3xl font-rubikBold text-ink-light">
          Your Result
        </Text>

        <View className="w-full bg-white items-center justify-center mt-24 pt-16 px-4 pb-6 rounded-3xl gap-2">
          <Text className="font-rubikSemiBold text-2xl">
            {passingRate < 60 ? "Try Again!" : "Congratulations!"}
          </Text>
          <Text className="font-rubik text-ink-darkGray text-xl">
            Your score is {passingRate.toFixed(2)}%
          </Text>

          <View className="flex-row gap-2 items-center justify-center">
            <View className="flex-row items-center gap-1 p-2">
              <MaterialCommunityIcons
                name="chat-question-outline"
                size={28}
                color="#65AAEA"
              />
              <Text className="text-xl font-rubikMedium">{quizLength}</Text>
            </View>

            <View className="flex-row items-center gap-1 p-2">
              <MaterialCommunityIcons
                name="check-bold"
                size={28}
                color="#5BA092"
              />
              <Text className="text-xl font-rubikMedium">{correctNumber}</Text>
            </View>

            <View className="flex-row items-center gap-1 p-2">
              <Ionicons name="close" size={30} color="#EF4949" />
              <Text className="text-xl font-rubikMedium">
                {incorrectNumber}
              </Text>
            </View>
          </View>

          <View className="absolute left-0 -top-14 right-0 items-center">
            <Image
              source={isPassed ? images.trophy : images.tryAgain}
              className={isPassed ? "size-28" : "size-24"}
            />
          </View>
        </View>

        <Button title="Back to Home" buttonStyle="mt-12" onPress={onClose} />

        <View className="mt-16 w-full">
          <Text className="font-rubikBold text-2xl">Summary</Text>

          <View className="mt-4 gap-4">
            {quizResult.map((result, index) => (
              <View
                key={index}
                className={`w-full px-4 py-6 gap-2 rounded-2xl ${result.isCorrect ? "bg-success" : "bg-error"}`}
              >
                <Text className="font-rubikLight text-white text-lg">
                  {result.question}
                </Text>
                <Text className="font-rubikSemiBold text-white text-lg">
                  Answer: {result.answer}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="h-[50px]" />
      </View>
    </ScrollView>
  );
};
export default QuizResult;
