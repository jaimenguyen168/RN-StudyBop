import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Course } from "@/types/type";
import { imageAssets } from "@/constants/options";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CourseCardItem from "@/components/home/CourseCardItem";

const CourseList = ({ courses }: { courses: Course[] }) => {
  return (
    <View className="flex">
      <View className="mx-8">
        <Text className="font-rubikSemiBold text-2xl">Courses</Text>
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
            <CourseCardItem course={item} isFirst={isFirst} isLast={isLast} />
          );
        }}
      />
    </View>
  );
};
export default CourseList;
