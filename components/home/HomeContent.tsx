import { View, Text, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import NoCourses from "@/components/home/NoCourses";
import { listenToCourses } from "@/libs/firebase";
import { Course } from "@/types/type";

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
      if (unsubscribe && typeof unsubscribe === "function") {
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
    <View>
      <Text>{courses[0].courseTitle}</Text>
    </View>
  );
};
export default HomeContent;
