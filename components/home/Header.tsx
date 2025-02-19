import { useAuthContext } from "@/contexts/firebase-auth";
import { Text, TouchableOpacity, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import React from "react";

const Header = () => {
  const { user } = useAuthContext();

  const handleSettingsPress = () => {};

  return (
    <View className="flex-row items-center justify-between px-8 py-4">
      <View className="flex gap-1">
        <Text className="text-2xl font-rubikSemiBold">
          Hello, <Text className="text-ink-light">{user?.displayName}</Text>
        </Text>
        <Text className="text-lg font-rubikMedium">Let's get started</Text>
      </View>

      <TouchableOpacity
        onPress={handleSettingsPress}
        className="p-2 -mr-2 bg-transparent"
      >
        <Octicons name="gear" size={28} color="#1E3A8A" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
