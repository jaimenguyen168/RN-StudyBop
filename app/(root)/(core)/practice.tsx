import { View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { PracticeOption, practiceOptions } from "@/constants/options";
import { listenToProgressCourses } from "@/libs/firebase";
import { Course } from "@/types/type";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import PracticeContent from "@/components/practice/PracticeContent";

const Practice = () => {
  const { path } = useLocalSearchParams();
  const option = practiceOptions.find(
    (item) => item.path === path,
  ) as PracticeOption;

  const [progressCourses, setProgressCourses] = useState<Course[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);

  const fetchProgressCourses = () => {
    setProgressLoading(true);
    return listenToProgressCourses((result) => {
      if (result.success) {
        const sorted = result.data.sort(
          (a, b) =>
            (b.lastUpdated?.toDate()?.getTime() || 0) -
            (a.lastUpdated?.toDate()?.getTime() || 0),
        );
        setProgressCourses(sorted);
      } else {
        Alert.alert("Error", result.error);
      }
      setProgressLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribeProgress = fetchProgressCourses();
    return () => {
      unsubscribeProgress();
    };
  }, []);

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
