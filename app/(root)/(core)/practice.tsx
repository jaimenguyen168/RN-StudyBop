import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { PracticePath } from "@/constants/options";

const Practice = () => {
  const { path } = useLocalSearchParams();

  const renderView = (path: string) => {
    switch (path) {
      case PracticePath.QUIZ:
        return <QuizList />;
      case PracticePath.FLASHCARDS:
        return <Flashcards />;
      case PracticePath.QA:
        return <QAList />;
      default:
        return <SomethingWentWrong />;
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center">
      {renderView(path as string)}
    </View>
  );
};
export default Practice;

const QuizList = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text>Quiz List</Text>
    </View>
  );
};

const Flashcards = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text>Flashcards</Text>
    </View>
  );
};

const QAList = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text>Q&A</Text>
    </View>
  );
};

const SomethingWentWrong = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text>Something went wrong</Text>
    </View>
  );
};
