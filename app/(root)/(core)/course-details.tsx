import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { listenToCourseById } from "@/libs/firebase";
import { Course } from "@/types/type";
import { imageAssets } from "@/constants/options";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";

const CourseDetails = () => {
  const { courseId } = useLocalSearchParams() as { courseId: string };
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);

      const unsubscribe = listenToCourseById(courseId, (result) => {
        if (result.success) {
          setCourse(result.data);
        } else {
          Alert.alert("Error", result.error);
        }
        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    }, [courseId]),
  );

  const handleGoBack = () => {
    router.back();
  };

  const handleStartLearning = () => {
    console.log("Start learning");
  };

  const handleChapterPress = (chapterName: string) => {
    const chapter = course?.chapters.find((c) => c.chapterName === chapterName);

    if (chapter) {
      router.push({
        pathname: "/(root)/(core)/chapter-details",
        params: {
          courseId: courseId,
          currentChapter: JSON.stringify(chapter),
        },
      });
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#E3562A"
        className="flex h-full -mt-24 items-center justify-center"
      />
    );
  }

  return (
    <View className="flex flex-1 items-center justify-center">
      {course && (
        <CourseDetailsContent
          course={course}
          onBackPress={handleGoBack}
          onStartLearningPress={handleStartLearning}
          onChapterPress={handleChapterPress}
        />
      )}
    </View>
  );
};
export default CourseDetails;

const CourseDetailsContent = ({
  course,
  onBackPress,
  onStartLearningPress,
  onChapterPress,
}: {
  course: Course;
  onBackPress: () => void;
  onStartLearningPress: () => void;
  onChapterPress: (chapterName: string) => void;
}) => {
  const bannerImage = course?.banner_image as keyof typeof imageAssets;

  return (
    <View>
      <FlatList
        data={course?.chapters}
        keyExtractor={(item) => item.chapterName}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <View>
              <Image
                source={imageAssets[bannerImage]}
                className="w-screen h-[350px]"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={onBackPress}
                className="absolute top-16 left-8 bg-black/20 p-2 rounded-full"
              >
                <Ionicons name="arrow-back" size={28} color="white" />
              </TouchableOpacity>
            </View>

            <View className="px-8 pt-8 gap-6">
              <View className="flex w-full gap-2">
                <Text className="text-2xl font-rubikBold" numberOfLines={2}>
                  {course?.courseTitle}
                </Text>

                <View className="flex-row items-center gap-2">
                  <Ionicons name="book-outline" size={24} color="#78746D" />
                  <Text className="font-rubik text-lg text-ink-darkGray">
                    {course?.chapters.length}{" "}
                    {course?.chapters.length === 1 ? "chapter" : "chapters"}
                  </Text>
                </View>
              </View>

              <View className="flex w-full gap-2">
                <Text className="text-xl font-rubikSemiBold">Description:</Text>
                <Text className="font-rubikLight text-justify">
                  {course?.description}
                </Text>
              </View>

              <Button
                title="Start Learning"
                buttonStyle="my-4"
                onPress={onStartLearningPress}
              />

              <Text className="text-2xl font-rubikSemiBold mb-4">
                Chapters:
              </Text>
            </View>
          </>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onChapterPress(item.chapterName)}
            className="px-8 py-2"
          >
            <ChapterRowItem
              chapterName={item.chapterName as string}
              isCompleted={item.isCompleted as boolean}
              index={index}
            />
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <View className="flex flex-1 items-center justify-center h-32 w-full">
            <Text className="mb-4 font-rubikItalic">
              Created with AI 🤖 Inspired by creativity 🚀
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const ChapterRowItem = ({
  chapterName,
  isCompleted = false,
  index,
}: {
  chapterName: string;
  isCompleted?: boolean;
  index: number;
}) => {
  return (
    <View className="flex-row px-6 py-5 gap-4 border border-ink-darkGray rounded-3xl">
      <Text
        className={`text-lg flex-1 ${isCompleted ? "font-rubikLight" : "font-rubikMedium"}`}
        numberOfLines={1}
      >
        {index + 1}. {chapterName}
      </Text>

      {isCompleted ? (
        <Ionicons name="checkmark-circle" size={24} color="#5BA092" />
      ) : (
        <Ionicons name="chevron-forward-circle" size={24} color="#E3562A" />
      )}
    </View>
  );
};
