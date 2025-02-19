import { View, Text, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Course } from "@/types/type";
import { listenToCourses } from "@/libs/firebase";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import CourseCardItem from "@/components/home/CourseCardItem";
import { courseCategory } from "@/constants/options";

const Explore = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    setLoading(true);
    return listenToCourses(true, (result) => {
      if (result.success) {
        setCourses(result.data);
      } else {
        Alert.alert("Error", result.error);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribeCourses = fetchCourses();
    return () => {
      if (typeof unsubscribeCourses === "function") {
        unsubscribeCourses();
      }
    };
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View className="flex flex-1">
      <View className="bg-transparent gap-6 flex mb-16">
        <FlatList
          data={[1]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className="justify-center px-8 mt-20 mb-8">
              <Text className="text-3xl font-rubikSemiBold ">
                Explore More Courses
              </Text>
            </View>
          )}
          renderItem={() => (
            <View className="flex gap-6">
              {courseCategory.map((category, index) => {
                const filteredCourses = courses.filter(
                  (item) => item.category === category,
                );

                if (filteredCourses.length > 0) {
                  return (
                    <View key={index}>
                      <Text className="text-2xl font-rubikSemiBold px-8">
                        {category}
                      </Text>

                      <FlatList
                        data={filteredCourses}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="py-3"
                        renderItem={({ item }) => {
                          const isFirst = item.id === filteredCourses[0].id;
                          const isLast =
                            item.id ===
                            filteredCourses[filteredCourses.length - 1].id;

                          return (
                            <CourseCardItem
                              course={item}
                              isFirst={isFirst}
                              isLast={isLast}
                            />
                          );
                        }}
                      />
                    </View>
                  );
                }
                return null;
              })}
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Explore;
