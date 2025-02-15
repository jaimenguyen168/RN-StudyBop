import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { practiceOptions, PracticePath } from "@/constants/options";
import { router } from "expo-router";

const PracticeList = () => {
  const handleItemPress = (path: string) => {
    router.push({
      pathname: "/(root)/(core)/practice",
      params: { path },
    });
  };

  return (
    <View className="flex">
      <View className="mb-2 mx-8">
        <Text className="font-rubikSemiBold text-2xl">Practice</Text>
      </View>

      <FlatList
        data={practiceOptions}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-3"
        renderItem={({ item }) => {
          const isFirst = practiceOptions.indexOf(item) === 0;
          const isLast =
            practiceOptions.indexOf(item) === practiceOptions.length - 1;

          return (
            <TouchableOpacity
              className={`rounded-2xl ${isFirst ? "ml-8" : "ml-2"} ${isLast ? "mr-8" : "mr-2"}`}
              onPress={() => handleItemPress(item.path)}
            >
              <Image
                source={item.image}
                className="size-40 rounded-2xl"
                resizeMode="contain"
              />
              <Text className="absolute top-4 left-4 font-rubikMedium text-xl text-white">
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default PracticeList;
