import { FlatList, View } from "react-native";
import React from "react";
import NoCourses from "@/components/home/NoCourses";
import CourseList from "@/components/home/CourseList";
import PracticeList from "@/components/home/PracticeList";
import CoursesProgress from "@/components/home/CoursesProgress";
import Header from "@/components/home/Header";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useCourses } from "@/hooks/firebase";

const HomeContent = () => {
  const {
    courses,
    progressCourses,
    loading,
    progressLoading,
    onRefresh,
    refreshing,
  } = useCourses({ fetchAll: false });

  if (loading || progressLoading) {
    return <LoadingIndicator />;
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
            <View className="bg-transparent mt-16 gap-4">
              <Header />
              {progressCourses.length > 0 && (
                <CoursesProgress courses={progressCourses} />
              )}
              {progressCourses.length > 0 && <PracticeList />}
              {courses.length > 0 && <CourseList courses={courses} />}

              {courses.length === 0 && progressCourses.length === 0 && (
                <View className="px-12">
                  <NoCourses />
                </View>
              )}

              <View className="h-[150px]" />
            </View>
          );
        }}
      />
    </View>
  );
};
export default HomeContent;
