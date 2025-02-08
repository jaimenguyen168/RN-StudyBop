import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { onboardingContent } from "@/constants/static";
import Carousel, { CarouselProps } from "@/components/Carousel";
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
        items={onboardingContent as CarouselProps[]}
        onEnded={handleOnEnded}
      />
    </View>
  );
};

export default Onboarding;
