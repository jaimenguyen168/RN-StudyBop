import { ActivityIndicator } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      size="large"
      color="#E3562A"
      className="flex h-full -mt-24 items-center justify-center"
    />
  );
};
export default LoadingIndicator;
