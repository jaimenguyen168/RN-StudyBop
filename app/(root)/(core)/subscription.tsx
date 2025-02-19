import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import Button from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const plans = ["Standard", "Premium"];

const planDetails = [
  "Access to basic features",
  "Enroll in upto 5 courses",
  "Unlock all features",
  "Create unlimited courses",
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  const handleSubscribe = () => {
    console.log("Subscribe");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View className="flex-1 items-center">
      <Image
        source={images.brainstorming}
        className="w-full h-[250px] mt-12"
        resizeMode="cover"
      />

      <View className="flex-1 w-full mt-12 items-center px-12 justify-between pb-12">
        <View className="w-full items-center gap-3">
          <Text className="font-rubikSemiBold text-2xl text-center">
            Subscribe to unlock all features
          </Text>

          <View className="flex-row items-center gap-1 px-32">
            {plans.map((plan, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 ${index === 0 ? "rounded-l-3xl" : "rounded-r-3xl"} ${selectedPlan === plan ? "bg-primary" : "bg-white"}`}
                onPress={() => setSelectedPlan(plan)}
              >
                <Text
                  className={`font-rubikSemiBold text-lg ${selectedPlan === plan ? "text-white" : "text-ink-darkGray"}`}
                >
                  {plan}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedPlan === plans[0] ? <StandardPlan /> : <PremiumPlan />}
        </View>

        <View className="w-full flex gap-6">
          <Button title="Subscribe" onPress={handleSubscribe} />

          <Button
            title="Cancel"
            buttonStyle="bg-white border border-primary"
            textStyle="text-primary font-rubikSemiBold text-lg"
            onPress={handleCancel}
          />
        </View>
      </View>
    </View>
  );
};
export default Subscription;

const PremiumPlan = () => {
  const [option, setOption] = useState("");

  const handleSelectOption = (option: string) => {
    setOption(option);
  };

  return (
    <View className="w-full items-center gap-4">
      <View>
        {planDetails.map((detail, index) => {
          return (
            <View key={index} className="flex-row items-center gap-2">
              <Ionicons name="checkmark" size={18} color="green" />
              <Text className="font-rubik text-lg text-ink-dark">{detail}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        className={`w-full p-4 border rounded-xl gap-1 ${option === "annual" ? "border-primary border-2" : "border-ink-gray"}`}
        onPress={() => handleSelectOption("annual")}
      >
        <Text className="text-xl font-rubikSemiBold">Annual</Text>
        <Text className="font-rubik">
          Save up to 20% for just{" "}
          <Text className="font-rubikSemiBold">$79.99/year</Text>
        </Text>

        <View className="absolute top-0 right-0 rounded-tr-lg rounded-bl-lg p-2 bg-warning">
          <Text className="font-rubikMediumItalic text-sm">Recommended</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className={`w-full p-4 border rounded-xl gap-1 ${option === "premium" ? "border-primary border-2" : "border-ink-gray"}`}
        onPress={() => handleSelectOption("premium")}
      >
        <Text className="text-xl font-rubikSemiBold">Monthly</Text>
        <Text className="font-rubik">
          Full access for just{" "}
          <Text className="font-rubikSemiBold">$9.99/month</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const StandardPlan = () => {
  return (
    <View className="w-full items-center gap-4">
      <View>
        {planDetails.map((detail, index) => {
          return (
            <View key={index} className="flex-row items-center gap-2">
              {index > 1 ? (
                <Ionicons name="close" size={18} color="red" />
              ) : (
                <Ionicons name="checkmark" size={18} color="green" />
              )}
              <Text
                className={`font-rubik text-lg text-ink-dark ${index > 1 && "line-through"}`}
              >
                {detail}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="w-full p-4 border-ink-gray border rounded-xl gap-1">
        <Text className="text-xl font-rubikSemiBold">Free</Text>
        <Text className="font-rubik">Upgrade for more features</Text>
      </View>
    </View>
  );
};
