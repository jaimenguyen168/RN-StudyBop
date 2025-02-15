import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/home/Header";
import HomeContent from "@/components/home/HomeContent";
import { Image, View } from "react-native";
import images from "@/constants/images";

const Home = () => {
  return (
    <View className="flex flex-1 justify-center px-8 gap-6">
      <Image source={images.wave} className="h-[450px] absolute top-0" />
      <HomeContent />
    </View>
  );
};
export default Home;
