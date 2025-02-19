import { View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { PracticeOption, practiceOptions } from "@/constants/options";
import { listenToProgressCourses } from "@/libs/firebase";
import { Course } from "@/types/type";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import PracticeContent from "@/components/practice/PracticeContent";
import useCourses from "@/hooks/firebase";

const Practice = () => {
  const { path } = useLocalSearchParams();
  const option = practiceOptions.find(
    (item) => item.path === path,
  ) as PracticeOption;

  const { progressCourses, progressLoading, onRefresh, refreshing } =
    useCourses();

  if (progressLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <PracticeContent courses={progressCourses} option={option} />
    </View>
  );
};

export default Practice;
