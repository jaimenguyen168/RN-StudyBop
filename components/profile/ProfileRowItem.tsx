import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  icon: any;
  title: string;
  onPress: () => void;
}

const ProfileRowItem = ({ icon, title, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-row w-full gap-4 items-center border border-ink-gray rounded-3xl p-3"
      onPress={onPress}
    >
      <View className="items-center p-2 bg-ink-lightGray rounded-xl">
        {icon}
      </View>
      <Text className="font-rubik text-xl text-ink-dark">{title}</Text>
    </TouchableOpacity>
  );
};
export default ProfileRowItem;
