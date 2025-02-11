import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
    </Tabs>
  );
};
export default TabsLayout;
