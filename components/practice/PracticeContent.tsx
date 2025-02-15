import { Course } from "@/types/type";
import { PracticeOption } from "@/constants/options";
import { FlatList, View } from "react-native";
import React from "react";
import PracticeHeader from "@/components/practice/PracticeHeader";
import PracticeItem from "@/components/practice/PracticeItem";

interface PracticeProps {
  courses?: Course[];
  option: PracticeOption;
}

const PracticeContent = ({ courses, option }: PracticeProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={() => (
          <PracticeHeader name={option.name} image={option.image} />
        )}
        renderItem={({ item, index }) => (
          <PracticeItem course={item} option={option} index={index} />
        )}
      />
    </View>
  );
};

export default PracticeContent;
