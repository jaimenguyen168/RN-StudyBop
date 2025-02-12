import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { generateTopic } from "@/libs/gemini";
import prompt from "@/constants/prompt";

const Add = () => {
  const [topics, setTopics] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeText = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleGenerate = async () => {
    setLoading(true);

    const promptText = form.title + prompt.IDEA;
    const response = await generateTopic.sendMessage(promptText);
    const result = JSON.parse(response.response.text());

    console.log("result", result);
    setTopics(result);

    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View className="flex justify-center px-8 pt-4 gap-6">
        <View className="gap-2">
          <Text className="font-rubikSemiBold text-3xl">
            Create a new course
          </Text>
          <Text className="font-rubik text-2xl">
            What do you want to learn today?
          </Text>
        </View>

        <View className="gap-4">
          <Text className="font-rubikLight text-lg">
            What course do you want to create (ex. learn Python, Digital
            Marketing, Science 101, etc...).
          </Text>
          <FormField
            placeholder="Ex. Python, Chemistry, Business, etc."
            value={form.title}
            isLongText
            onChangeText={(value) => onChangeText("title", value)}
          />

          <Button
            title="Generate"
            loading={loading}
            buttonStyle="mt-4"
            onPress={handleGenerate}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Add;
