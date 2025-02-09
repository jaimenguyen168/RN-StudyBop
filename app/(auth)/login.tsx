import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import { FontAwesome } from "@expo/vector-icons";
import FormField from "@/components/FormField";
import { Link } from "expo-router";
import Button from "@/components/Button";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChangeText = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async () => {};

  const handleSignInWithApple = async () => {};

  const handleSignInWithFacebook = async () => {};

  const handleSignInWithGoogle = async () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "position" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View className="flex-1 w-full items-center justify-center">
            <Image
              source={images.hello1}
              className="w-[320px] mt-12"
              resizeMode="contain"
            />

            <View className="flex w-full items-center gap-4 -mt-4">
              <Text className="text-3xl font-rubikSemiBold">Log In</Text>
              <Text className="text-lg font-rubik text-center text-ink-darkGray"></Text>
              <View className="flex-row gap-6">
                <SocialLogin
                  icon={<FontAwesome name="apple" size={48} color="#65AAEA" />}
                  onPress={handleSignInWithApple}
                />

                <SocialLogin
                  icon={
                    <FontAwesome
                      name="facebook-square"
                      size={48}
                      color="#65AAEA"
                    />
                  }
                  onPress={handleSignInWithFacebook}
                />

                <SocialLogin
                  icon={
                    <FontAwesome name="google-plus" size={48} color="#65AAEA" />
                  }
                  onPress={handleSignInWithGoogle}
                />
              </View>
            </View>

            <View className="px-8 py-12 gap-6 w-full">
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

              <Link href={"/(auth)/forgot-password"}>
                <Text className="text-lg font-rubikSemiBold text-ink-gray text-center">
                  Forgot Password?
                </Text>
              </Link>

              <Button title="Log In" onPress={handleLogin} />

              <Link href={"/(auth)/register"}>
                <Text className="text-center">
                  <Text className="text-ink-darkGray font-rubik">
                    Don't have an account?{" "}
                  </Text>
                  <Text className="text-lg font-rubikMedium text-primary">
                    Sign Up!
                  </Text>
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Login;

const SocialLogin = ({ icon, onPress }: { icon: any; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} className="items-center justify-center">
      {icon}
    </TouchableOpacity>
  );
};
