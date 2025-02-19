import { Course } from "@/types/type";
import { imageAssets } from "@/constants/options";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const CourseCardItem = ({
  course,
  isFirst = false,
  isLast = false,
}: {
  course: Course;
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  const bannerImage = course.banner_image as keyof typeof imageAssets;

  const goToCourseDetails = () => {
    router.push({
      pathname: "/(root)/(core)/course-details",
      params: { courseId: course.id },
    });
  };

  return (
    <TouchableOpacity
      onPress={goToCourseDetails}
      className={`items-start justify-start w-[250px] h-auto gap-4 bg-white p-3 pb-8 rounded-2xl ${isFirst ? "ml-8" : "ml-3"} ${isLast ? "mr-8" : "mr-3"}`}
    >
      <Image
        source={imageAssets[bannerImage]}
        className="w-full h-[150px] rounded-xl"
        resizeMode="cover"
      />
      <View className="gap-2">
        <Text
          className="text-md font-rubikSemiBold space-y-6"
          numberOfLines={2}
        >
          {course.courseTitle}
        </Text>
        <View className="flex-row items-center gap-2">
          <Ionicons name="book-outline" size={20} color="#78746D" />
          <Text className="text-sm font-rubik text-ink-darkGray">
            {course.chapters.length}{" "}
            {course.chapters.length > 1 ? "Chapters" : "Chapter"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCardItem;
