import { Alert, Dimensions, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { UserProgress } from "@/types/type";
import { listenToLast7DaysProgress } from "@/libs/firebase";
import { format, parseISO, subDays } from "date-fns";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { LineChart } from "react-native-chart-kit";

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

export default WeeklyTimeChart;
