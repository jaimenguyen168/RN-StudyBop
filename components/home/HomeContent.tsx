import { View, Text, Alert, ActivityIndicator, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import NoCourses from "@/components/home/NoCourses";
import { listenToCourses, listenToProgressCourses } from "@/libs/firebase";
import { Course } from "@/types/type";
import CourseList from "@/components/home/CourseList";
import PracticeList from "@/components/home/PracticeList";
import CoursesProgress from "@/components/home/CoursesProgress";
import { useFocusEffect } from "expo-router";

const HomeContent = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressCourses, setProgressCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToCourses(true, (result) => {
      if (result.success) {
        setCourses(result.data);
        setLoading(false);
      } else {
        Alert.alert("Error", result.error);
        setLoading(false);
      }
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setProgressLoading(true);

      const unsubscribe = listenToProgressCourses((result) => {
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

      return () => {
        unsubscribe();
      };
    }, []),
  );

  if (loading || progressLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#E3562A"
        className="flex h-full -mt-24 items-center justify-center"
      />
    );
  }

  if (courses.length === 0) {
    return <NoCourses />;
  }

  return (
    <View className="flex flex-1">
      <FlatList
        data={[1]}
        refreshing={loading || progressLoading}
        className="-mx-8"
        renderItem={() => {
          return (
            <View>
              <CoursesProgress courses={progressCourses} />
              <PracticeList />
              <CourseList courses={courses} />
            </View>
          );
        }}
      />
    </View>
  );
};
export default HomeContent;
