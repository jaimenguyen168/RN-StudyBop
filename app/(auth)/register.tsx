import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import FormField from "@/components/ui/FormField";
import { Link, router } from "expo-router";
import Button from "@/components/ui/Button";
import { signUp } from "@/libs/firebase";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleOnChangeText = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignUp = async () => {
    const result = await signUp(form.name, form.email, form.password);

    if (result.success) {
      router.replace("/(root)/(tabs)/home");
    } else {
      Alert.alert("Error", result.error);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 w-full items-center justify-center">
            <TouchableOpacity
              onPress={handleBackPress}
              className="absolute top-20 left-8 p-3 rounded-full border border-ink-gray"
            >
              <Ionicons name="chevron-back" size={24} color="#78746D" />
            </TouchableOpacity>

            <Image
              source={images.hello2}
              className="w-[320px] mt-12"
              resizeMode="contain"
            />

            <View className="flex w-full items-center gap-4 -mt-4">
              <Text className="text-3xl font-rubikSemiBold">Sign Up</Text>
              <Text className="text-lg font-rubik text-center text-ink-darkGray">
                Create A New Account
              </Text>
            </View>

            <View className="px-8 py-12 gap-6 w-full">
              <FormField
                placeholder="Name"
                value={form.name}
                onChangeText={(text) => handleOnChangeText("name", text)}
              />

              <FormField
                placeholder="Email"
                value={form.email}
                onChangeText={(text) => handleOnChangeText("email", text)}
              />

              <FormField
                placeholder="Password"
                value={form.password}
                secureTextEntry
                onChangeText={(text) => handleOnChangeText("password", text)}
              />

              <Button
                title="Register"
                onPress={handleSignUp}
                buttonStyle="mt-6"
              />

              <Pressable onPress={handleBackPress}>
                <Text className="text-center">
                  <Text className="text-ink-darkGray font-rubik">
                    Already have an account?{" "}
                  </Text>
                  <Text className="text-lg font-rubikMedium text-primary">
                    Login!
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Register;
