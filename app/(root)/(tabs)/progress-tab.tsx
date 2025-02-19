import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import WeeklyTimeChart from "@/components/progress/WeeklyTimeChart";
import NoCourses from "@/components/home/NoCourses";
import { router } from "expo-router";
import ProgressCardItem from "@/components/progress/ProgressCardItem";
import ProgressHeader from "@/components/progress/ProgressHeader";
import useCourses from "@/hooks/firebase";

const ProgressTab = () => {
  const { progressCourses, progressLoading, onRefresh, refreshing } =
    useCourses();

  const goToCourseDetails = (courseId: string) => {
    router.push({
      pathname: "/(root)/(core)/course-details",
      params: { courseId },
    });
  };

  if (progressLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="flex flex-1 pb-24">
      <Image source={images.wave} className="h-screen absolute top-0" />
      <FlatList
        data={progressCourses}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            className="w-full items-center px-8"
            onPress={() => goToCourseDetails(item.id)}
          >
            <ProgressCardItem course={item} />
          </Pressable>
        )}
        ListHeaderComponent={() => {
          return (
            <View className="bg-transparent mt-16 items-center">
              <ProgressHeader />

              {progressCourses.length > 0 && (
                <View className="bg-ink-light p-4 rounded-2xl w-[86%] h-[300px] items-center">
                  <WeeklyTimeChart />
                </View>
              )}
            </View>
          );
        }}
        ListFooterComponent={() => <View className="h-[50px]" />}
        ListEmptyComponent={() => (
          <View className="px-12 mt-4">
            <NoCourses />
          </View>
        )}
      />
    </View>
  );
};

export default ProgressTab;
