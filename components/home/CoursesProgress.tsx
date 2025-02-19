import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Course } from "@/types/type";
import { imageAssets } from "@/constants/options";
import * as Progress from "react-native-progress";
import CourseCardProgress from "@/components/home/CourseCardProgress";

const CoursesProgress = ({ courses }: { courses: Course[] }) => {
  return (
    <View className="flex">
      <View className="mx-8">
        <Text className="font-rubikSemiBold text-2xl">Progress</Text>
      </View>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-3"
        renderItem={({ item }) => {
          const isFirst = item.id === courses[0].id;
          const isLast = item.id === courses[courses.length - 1].id;

          return (
            <CourseCardProgress
              course={item}
              isFirst={isFirst}
              isLast={isLast}
            />
          );
        }}
      />
    </View>
  );
};

export default CoursesProgress;
