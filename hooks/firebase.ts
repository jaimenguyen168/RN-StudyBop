import { Course } from "@/types/type";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { listenToCourses, listenToProgressCourses } from "@/libs/firebase";

const useCourses = ({ fetchAll = true }: { fetchAll?: boolean } = {}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressCourses, setProgressCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    return listenToCourses(fetchAll, (result) => {
      if (result.success) {
        setCourses(result.data);
      } else {
        Alert.alert("Error", result.error);
      }
      setLoading(false);
    });
  };

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
    const unsubscribeCourses = fetchCourses();
    const unsubscribeProgress = fetchProgressCourses();
    return () => {
      unsubscribeProgress();
      if (typeof unsubscribeCourses === "function") {
        unsubscribeCourses();
      }
    };
  }, [listenToCourses, listenToProgressCourses]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCourses();
    fetchProgressCourses();
    setRefreshing(false);
  };

  return {
    courses,
    progressCourses,
    loading,
    progressLoading,
    onRefresh,
    refreshing,
  };
};

export default useCourses;
