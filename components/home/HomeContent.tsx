import { View, Text, Alert, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import NoCourses from "@/components/home/NoCourses";
import { listenToCourses } from "@/libs/firebase";
import { Course } from "@/types/type";
import CourseList from "@/components/home/CourseList";
import PracticeList from "@/components/home/PracticeList";
import CoursesProgress from "@/components/home/CoursesProgress";

const HomeContent = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
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
        className="-mx-8"
        renderItem={() => {
          return (
            <View>
              <CoursesProgress courses={courses.slice(4, 8)} />
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
