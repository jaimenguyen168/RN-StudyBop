import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  isLongText?: boolean;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const FormField = ({
  placeholder,
  secureTextEntry = false,
  value,
  isLongText = false,
  onChangeText,
  onFocus,
  onBlur,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="flex w-full items-start gap-3">
      <View className="flex-row items-center gap-2 z-0 w-full border border-ink-gray rounded-3xl">
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          className={`
            w-full px-4 py-6 bg-secondary-light rounded-3xl font-rubik pr-16 ${isLongText ? "h-32" : "h-auto"}
          `}
          multiline={isLongText}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            fontFamily: "Rubik-Light",
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={handleShowPassword}
            className="ml-auto absolute right-4 p-2 bg-secondary-light"
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#4F4F4F"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default FormField;
