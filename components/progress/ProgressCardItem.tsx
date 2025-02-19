import { Course } from "@/types/type";
import { imageAssets } from "@/constants/options";
import { Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import React from "react";

const ProgressCardItem = ({ course }: { course: Course }) => {
  const bannerImage = course.banner_image as keyof typeof imageAssets;

  const completedChaptersCount = course.chapters.filter(
    (chapter) => chapter.isCompleted,
  ).length;
  const progress = completedChaptersCount / course.chapters.length;

  return (
    <View
      className={`items-start justify-center w-full h-auto gap-4 bg-white p-3 pb-6 rounded-2xl mt-8`}
    >
      <View className="flex-row gap-3 w-full">
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

      <View className="gap-2 relative w-full">
        <Text>
          {completedChaptersCount} Out of {course.chapters.length}{" "}
          {course.chapters.length > 1 ? "Chapters" : "Chapter"} Completed
        </Text>

        <View className="absolute bottom-0 right-2">
          <Progress.Circle
            progress={progress}
            color="#E3562A"
            size={50}
            borderWidth={1}
            borderColor="#CCCCCC"
            unfilledColor="#F0F0F0"
            strokeCap="round"
            showsText={true}
            formatText={() => `${(progress * 100).toFixed(0)}%`}
            textStyle={{ fontSize: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProgressCardItem;
