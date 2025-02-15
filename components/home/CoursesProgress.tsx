import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Course } from "@/types/type";
import { imageAssets } from "@/constants/options";
import * as Progress from "react-native-progress";

const CoursesProgress = ({ courses }: { courses: Course[] }) => {
  return (
    <View className="flex">
      <View className="mb-2 mx-8">
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

const CourseCardProgress = ({
  course,
  isFirst = false,
  isLast = false,
}: {
  course: Course;
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  const bannerImage = course.banner_image as keyof typeof imageAssets;

  const completedChaptersCount = course.chapters.filter(
    (chapter) => chapter.isCompleted,
  ).length;

  return (
    <View
      className={`items-start justify-start w-[280px] h-auto gap-4 bg-white p-3 pb-6 rounded-2xl ${isFirst ? "ml-8" : "ml-3"} ${isLast ? "mr-8" : "mr-3"}`}
    >
      <View className="flex-row gap-3 w-[250px]">
        <Image
          source={imageAssets[bannerImage]}
          className="size-24 rounded-xl"
          resizeMode="cover"
        />
        <View className="gap-2 flex-1">
          <Text
            className="text-md font-rubikSemiBold space-y-6 text-wrap"
            numberOfLines={3}
          >
            {course.courseTitle}
          </Text>
          <Text className="text-sm font-rubik text-ink-darkGray">
            {course.chapters.length}{" "}
            {course.chapters.length > 1 ? "Chapters" : "Chapter"}
          </Text>
        </View>
      </View>

      <View className="gap-2">
        <Progress.Bar
          progress={completedChaptersCount / course.chapters.length}
          width={250}
          color="#E3562A"
        />
        <Text>
          {completedChaptersCount} Out of {course.chapters.length}{" "}
          {course.chapters.length > 1 ? "Chapters" : "Chapter"} Completed
        </Text>
      </View>
    </View>
  );
};
