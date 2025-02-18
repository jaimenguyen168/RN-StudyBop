import { View, Text } from "react-native";
import React, { useState } from "react";
import QuizResult, { QuizResultProps } from "@/components/practice/QuizResult";
import { router, useLocalSearchParams } from "expo-router";

const ShowResult = () => {
  const { quizResult } = useLocalSearchParams();
  const [result, setResult] = useState<
    { question: string; answer: string; isCorrect: boolean }[]
  >(JSON.parse(quizResult as string));

  return (
    <View className="flex-1 items-center justify-center">
      <QuizResult quizResult={result} onClose={() => router.back()} />
    </View>
  );
};
export default ShowResult;
