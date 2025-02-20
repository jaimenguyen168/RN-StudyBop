import { View, Text, FlatList } from "react-native";
import React from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import CourseCardItem from "@/components/home/CourseCardItem";
import { courseCategory } from "@/constants/options";
import { useCourses } from "@/hooks/firebase";

const Explore = () => {
  const { courses, progressCourses, loading, progressLoading } = useCourses();

  if (loading || progressLoading) {
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
                  (item) =>
                    item.category === category &&
                    !progressCourses.some(
                      (progressItem) => progressItem.id === item.id,
                    ),
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
