import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { onboardingContent } from "@/constants/onboarding";
import Carousel, { CarouselProps } from "@/components/ui/Carousel";
import { router } from "expo-router";

const Onboarding = () => {
  const handleOnEnded = (isEnded: boolean) => {
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 w-full">
      <View className="flex flex-row items-center justify-end mt-16 mr-12">
        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Text className="font-semibold text-lg text-primary">Skip</Text>
        </TouchableOpacity>
      </View>
      <Carousel
        items={onboardingContent}
        renderItem={({ item }) => <OnboardingContent item={item} />}
        onEnded={handleOnEnded}
      />
    </View>
  );
};

export default Onboarding;

type OnboardingCarousel = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

const OnboardingContent = ({ item }: { item: OnboardingCarousel }) => {
  const screenWidth = Dimensions.get("screen").width;
  return (
    <View
      className="items-center justify-center px-12 gap-8"
      style={{ width: screenWidth }}
    >
      <Image
        source={item.image}
        className="w-full h-[400px]"
        resizeMode="contain"
      />
      <View className="items-center gap-4">
        <Text className="text-3xl font-semibold text-center px-24">
          {item.title}
        </Text>
        <Text className="text-base text-center text-ink-darkGray px-8">
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};
