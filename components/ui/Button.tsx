import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

interface Props {
  title: string;
  textStyle?: string;
  buttonStyle?: string;
  shadowStyle?: string;
  loading?: boolean;
  onPress?: () => void;
}

const Button = ({
  title,
  textStyle = "text-white text-xl",
  buttonStyle,
  shadowStyle,
  loading = false,
  onPress,
}: Props) => {
  return (
    <View className={`w-full shadow-sm ${shadowStyle}`}>
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        className={`p-6 bg-primary rounded-3xl w-full items-center ${buttonStyle}`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className={`font-rubikMedium ${textStyle}`}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Button;
