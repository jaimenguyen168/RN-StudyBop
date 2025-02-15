import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  PracticeOption,
  practiceOptions,
  PracticePath,
} from "@/constants/options";
import { listenToProgressCourses } from "@/libs/firebase";
import { Course } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

const Practice = () => {
  const { path } = useLocalSearchParams();
  const option = practiceOptions.find(
    (item) => item.path === path,
  ) as PracticeOption;

  const [progressCourses, setProgressCourses] = useState<Course[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);

  const fetchProgressCourses = () => {
    setProgressLoading(true);
    return listenToProgressCourses((result) => {
      if (result.success) {
        const sorted = result.data.sort(
          (a, b) =>
            (b.lastUpdated?.toDate()?.getTime() || 0) -
            (a.lastUpdated?.toDate()?.getTime() || 0),
        );
        setProgressCourses(sorted);
      } else {
        Alert.alert("Error", result.error);
      }
      setProgressLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribeProgress = fetchProgressCourses();
    return () => {
      unsubscribeProgress();
    };
  }, []);

  if (progressLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <PracticeContent courses={progressCourses} option={option} />
    </View>
  );
};

export default Practice;

interface PracticeProps {
  courses?: Course[];
  option: PracticeOption;
}

const PracticeHeader = ({
  name,
  image,
}: Omit<PracticeOption, "path" | "icon">) => {
  return (
    <View className="flex bg-white items-center justify-center">
      <Image source={image} className="w-screen h-[280px]" resizeMode="cover" />
      <View className="absolute top-16 left-8 flex-row items-center gap-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className=" bg-black/20 p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <Text className="text-white font-rubikExtraBold text-3xl">{name}</Text>
      </View>
    </View>
  );
};

const PracticeContent = ({ courses, option }: PracticeProps) => {
  const { path } = option;

  const renderItemByPath = (course: Course, index: number) => {
    switch (path) {
      case PracticePath.QUIZ:
        return <QuizItem icon={option.icon} course={course} index={index} />;
      case PracticePath.FLASHCARDS:
        return <FlashcardItem />;
      case PracticePath.QA:
        return <QaItem />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={() => (
          <PracticeHeader name={option.name} image={option.image} />
        )}
        renderItem={({ item, index }) => renderItemByPath(item, index)}
      />
    </View>
  );
};

const QuizItem = ({
  icon,
  course,
  index,
}: {
  icon: any;
  course: Course;
  index: number;
}) => {
  return (
    <View
      className={`flex-1 flex items-center mt-8 rounded-3xl gap-2 p-4 mx-5 bg-white shadow-xl shadow-gray-200 ${
        index % 2 === 0 ? "ml-12" : "mr-12"
      }`}
    >
      <Image source={icon} className="w-full h-[100px]" resizeMode="contain" />
      <Text className="font-rubikLight text-sm text-center" numberOfLines={2}>
        {course.courseTitle}
      </Text>

      <View className="absolute top-2 right-2">
        <Ionicons name="checkmark-circle" size={24} color="#999" />
      </View>
    </View>
  );
};

const FlashcardItem = () => {
  return (
    <View>
      <Text>Flashcard</Text>
    </View>
  );
};

const QaItem = () => {
  return (
    <View>
      <Text>Q&A</Text>
    </View>
  );
};
