import { ActivityIndicator, Alert, FlatList, Image, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import NoCourses from "@/components/home/NoCourses";
import { listenToCourses, listenToProgressCourses } from "@/libs/firebase";
import { Course } from "@/types/type";
import CourseList from "@/components/home/CourseList";
import PracticeList from "@/components/home/PracticeList";
import CoursesProgress from "@/components/home/CoursesProgress";
import { useFocusEffect } from "expo-router";
import images from "@/constants/images";
import Header from "@/components/home/Header";

const HomeContent = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressCourses, setProgressCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    return listenToCourses(true, (result) => {
      if (result.success) {
        setCourses(result.data);
      } else {
        Alert.alert("Error", result.error);
      }
      setLoading(false);
    });
  };

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
    const unsubscribeCourses = fetchCourses();
    const unsubscribeProgress = fetchProgressCourses();
    return () => {
      unsubscribeProgress();
      if (typeof unsubscribeCourses === "function") {
        unsubscribeCourses();
      }
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCourses();
    fetchProgressCourses();
    setRefreshing(false);
  };

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
        onRefresh={onRefresh}
        refreshing={refreshing}
        className="-mx-8"
        showsVerticalScrollIndicator={false}
        renderItem={() => <></>}
        ListHeaderComponent={() => {
          return (
            <View className="bg-transparent mt-16">
              <Header />
              <CoursesProgress courses={progressCourses} />
              <PracticeList />
              <CourseList courses={courses} />
              <View className="h-[150px]" />
            </View>
          );
        }}
      />
    </View>
  );
};
export default HomeContent;
