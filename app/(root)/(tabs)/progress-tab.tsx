import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  listenToLast7DaysProgress,
  listenToProgressCourses,
} from "@/libs/firebase";
import { Course, UserProgress } from "@/types/type";
import images from "@/constants/images";
import { Octicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { imageAssets } from "@/constants/options";
import * as Progress from "react-native-progress";
import { format, parseISO, subDays } from "date-fns";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

const ProgressTab = () => {
  const [progressCourses, setProgressCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
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
      } else {
        Alert.alert("Error", result.error);
      }
      setProgressLoading(false);
    });
  };

  listenToLast7DaysProgress((progress) => {
    console.log("Updated Progress Data:", progress);
  });

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

  return (
    <View className="flex flex-1">
      <Image source={images.wave} className="h-screen w-full absolute top-0" />
      <FlatList
        data={progressCourses}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="w-full items-center px-8">
            <ProgressCard course={item} />
          </View>
        )}
        ListHeaderComponent={() => {
          return (
            <View className="bg-transparent mt-16 items-center">
              <View className="flex-row items-center w-full justify-between px-8 py-4">
                <View className="flex gap-1">
                  <Text className="text-2xl font-rubikSemiBold text-ink-light">
                    Your Progress
                  </Text>
                  <Text className="text-lg font-rubik">Let's review</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {}}
                  className="p-2 -mr-2 bg-transparent"
                >
                  <Octicons name="gear" size={28} color="#78746D" />
                </TouchableOpacity>
              </View>

              <View className="bg-ink-light p-4 rounded-2xl w-[86%] h-[300px] items-center">
                <WeeklyTimeChart />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProgressTab;

const ProgressCard = ({ course }: { course: Course }) => {
  const bannerImage = course.banner_image as keyof typeof imageAssets;

  const completedChaptersCount = course.chapters.filter(
    (chapter) => chapter.isCompleted,
  ).length;

  return (
    <View
      className={`items-start justify-start w-full h-auto gap-4 bg-white p-3 pb-6 rounded-2xl mt-8`}
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

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF", // White background
  backgroundGradientTo: "#FFFFFF", // Ensure full white background
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(227, 86, 42, ${opacity})`, // #E3562A for lines
  labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`, // Dark gray for labels
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "2",
    strokeWidth: "2",
    stroke: "#E3562A", // Dot outline color
    fill: "#E3562A", // Dot fill color
  },
  propsForBackgroundLines: {
    stroke: "#DDDDDD", // Light gray grid lines for subtle look
    strokeWidth: 1,
    strokeDasharray: "4", // Dotted lines
  },
};

const WeeklyTimeChart = () => {
  const screenWidth = Dimensions.get("window").width;

  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToLast7DaysProgress((result) => {
      if (result.success) {
        setUserProgress(result.data);

        const labels = Array.from({ length: 7 }, (_, i) => {
          const date = subDays(new Date(), 6 - i);
          return format(date, "EEE");
        });

        const chartData = {
          labels: labels,
          datasets: [
            {
              data: labels.map((label) => {
                const foundProgress = result.data.find((item: UserProgress) => {
                  const itemDay = format(parseISO(item.date), "EEE");
                  return itemDay === label;
                });
                console.log(foundProgress);
                return foundProgress ? foundProgress.chapterCount : 0; // Default to 0 if no progress
              }),
              strokeWidth: 2,
            },
          ],
        };

        setData(chartData); // Update chart data state

        setLoading(false);
      } else {
        Alert.alert("Error", result.error);
        setLoading(false);
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View className="items-center mt-4">
      <Text className="text-lg font-bold mb-2">Weekly Data</Text>
      <LineChart
        data={data}
        width={screenWidth - 100}
        height={200}
        chartConfig={chartConfig}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
};
