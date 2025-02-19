import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  listenToLast7DaysProgress,
  listenToProgressCourses,
} from "@/libs/firebase";
import { Course } from "@/types/type";
import images from "@/constants/images";
import { Octicons } from "@expo/vector-icons";
import { imageAssets } from "@/constants/options";
import * as Progress from "react-native-progress";
import WeeklyTimeChart from "@/components/progress/WeeklyTimeChart";
import NoCourses from "@/components/home/NoCourses";
import { router } from "expo-router";
import ProgressCardItem from "@/components/progress/ProgressCardItem";
import ProgressHeader from "@/components/progress/ProgressHeader";

const ProgressTab = () => {
  const [progressCourses, setProgressCourses] = useState<Course[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
        setProgressLoading(false);
      } else {
        Alert.alert("Error", result.error);
        setProgressLoading(false);
      }
    });
  };

  useEffect(() => {
    const unsubscribeProgress = fetchProgressCourses();
    return () => {
      unsubscribeProgress();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProgressCourses();
    setRefreshing(false);
  };

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
      <Image source={images.wave} className="h-screen w-full absolute top-0" />
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
          <View className="px-12">
            <NoCourses />
          </View>
        )}
      />
    </View>
  );
};

export default ProgressTab;
