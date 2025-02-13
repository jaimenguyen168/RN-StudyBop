import React from "react";
import { Stack } from "expo-router";

const CoreLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add" />
      <Stack.Screen name="course-details" />
    </Stack>
  );
};
export default CoreLayout;
