import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/home/Header";
import HomeContent from "@/components/home/HomeContent";

const Home = () => {
  return (
    <SafeAreaView className="flex flex-1 justify-center px-8 gap-6">
      <Header />
      <HomeContent />
    </SafeAreaView>
  );
};
export default Home;
