import { Dimensions, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Chapter, Content } from "@/types/type";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingContent } from "@/constants/onboarding";
import Carousel from "@/components/ui/Carousel";
import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";

const ChapterDetails = () => {
  const { currentChapter } = useLocalSearchParams();
  const chapter = JSON.parse(currentChapter as string) as Chapter;

  const [currentPage, setCurrentPage] = useState(0);

  const getProgress = () => {
    return (currentPage + 1) / chapter.content.length;
  };

  const width =
    Dimensions.get("window").width * (currentPage == 0 ? 0.65 : 0.65);

  const [goBackSignal, setGoBackSignal] = useState(false);

  return (
    <SafeAreaView className="flex-1 w-full items-center py-4">
      <View className="flex-row gap-4 px-8 items-center h-12">
        {currentPage > -1 && (
          <Pressable
            onPress={() => setGoBackSignal((prev) => !prev)}
            className="p-1 bg-transparent rounded-full"
          >
            <Ionicons name="chevron-back" size={24} color="#E3562A" />
          </Pressable>
        )}
        <Progress.Bar progress={getProgress()} width={width} color="#E3562A" />

        <Pressable
          onPress={() => router.back()}
          className="p-1 bg-transparent rounded-full"
        >
          <Ionicons name="close" size={24} color="#E3562A" />
        </Pressable>
      </View>

      <View className="flex-1 w-full items-center justify-center py-6 mt-16">
        <Carousel
          items={chapter.content}
          buttonTitle="I Got It"
          renderItem={({ item }) => <ChapterContent item={item} />}
          onEnded={(isEnded: boolean) => {}}
          goBackSignal={goBackSignal}
          onIndexChange={(index: number) => setCurrentPage(index)}
        />
      </View>
    </SafeAreaView>
  );
};
export default ChapterDetails;

const ChapterContent = ({ item }: { item: Content }) => {
  const { topic, explain, code, example } = item;

  return (
    <View className="w-full items-center justify-center">
      <View className="gap-8 max-w-[80%]">
        <View className="gap-3">
          <Text className="font-rubikBold text-2xl" numberOfLines={2}>
            {topic}
          </Text>

          <Text className="text-lg text-justify font-rubik">{explain}</Text>
        </View>

        {code && (
          <View className="bg-black p-4 rounded-2xl">
            <Text className="text-md font-rubik text-white">{code}</Text>
          </View>
        )}

        {example && (
          <View className="bg-ink-gray p-4 rounded-2xl">
            <Text className="text-md font-rubik">{example}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
