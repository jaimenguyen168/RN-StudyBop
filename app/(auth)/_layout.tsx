import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          width: "100%",
          height: "100%",
        },
      }}
      initialRouteName="onboarding"
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
    </Stack>
  );
};
export default AuthLayout;
