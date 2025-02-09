import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#fff",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
};
export default AuthLayout;
