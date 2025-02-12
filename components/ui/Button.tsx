import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

interface Props {
  title: string;
  textStyle?: string;
  buttonStyle?: string;
  shadowStyle?: string;
  loading?: boolean;
  disabled?: boolean;
  loadingColor?: string;
  onPress?: () => void;
}

const Button = ({
  title,
  textStyle = "text-white text-xl",
  buttonStyle = "shadow-sm",
  shadowStyle,
  loading = false,
  disabled = false,
  loadingColor = "white",
  onPress,
}: Props) => {
  return (
    <View className={`w-full ${shadowStyle}`}>
      <TouchableOpacity
        onPress={onPress}
        disabled={loading || disabled}
        className={`p-6 ${disabled ? "bg-primary/60" : "bg-primary"} rounded-3xl w-full items-center ${buttonStyle}`}
      >
        {loading ? (
          <ActivityIndicator size="small" color={loadingColor} />
        ) : (
          <Text className={`font-rubikMedium ${textStyle}`}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Button;
