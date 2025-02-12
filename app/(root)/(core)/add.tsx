import {
  View,
  Text,
  Pressable,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { generateCourse, generateTopics } from "@/libs/gemini";
import prompt from "@/constants/prompt";
import { BlurView } from "expo-blur";
import images from "@/constants/images";

const Add = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const disabled = selectedTopics.length === 0;

  const [form, setForm] = useState({
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  const onChangeText = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleGenerateTopics = async () => {
    setLoading(true);

    const promptText = form.title + prompt.IDEA;
    const response = await generateTopics.sendMessage(promptText);
    const result = JSON.parse(response.response.text());

    console.log("result", result);
    setTopics(result);

    setLoading(false);
  };

  const handleSelectTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleGenerateCourse = async () => {
    if (disabled) return;

    setCourseLoading(true);
    const promptText = selectedTopics.join(", ") + prompt.COURSE;
    const response = await generateCourse.sendMessage(promptText);
    const result = JSON.parse(response.response.text());

    console.log("result", result);

    setCourseLoading(false);
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex w-full h-full bg-white">
        <View className="flex justify-center px-8 pt-20 gap-6">
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
              title="Generate Topics"
              loading={loading}
              loadingColor="#E3562A"
              buttonStyle="mt-2 bg-white border border-primary"
              shadowStyle="shadow-none"
              textStyle="text-primary font-rubikMedium text-lg"
              onPress={handleGenerateTopics}
            />
          </View>

          {topics.length > 0 && (
            <View className="gap-3 mt-4">
              <Text className="font-rubikMedium text-lg">
                Select all the topics you want to add in the course.
              </Text>

              <View className="flex flex-row flex-wrap gap-2 gap-y-3">
                {topics.map((topic, index) => (
                  <TopicItem
                    key={index}
                    topic={topic}
                    isSelected={selectedTopics.includes(topic)}
                    onPress={handleSelectTopic}
                  />
                ))}
              </View>

              <Button
                title="Generate New Course"
                disabled={disabled}
                buttonStyle="mt-4"
                onPress={handleGenerateCourse}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {courseLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/40">
          <BlurView
            intensity={20}
            className="absolute top-0 left-0 right-0 bottom-0"
          />
          <Image
            source={images.loading}
            className="size-64"
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

export default Add;

const TopicItem = ({
  topic,
  isSelected = false,
  onPress,
}: {
  topic: string;
  isSelected?: boolean;
  onPress: (topic: string) => void;
}) => {
  return (
    <Pressable
      onPress={() => onPress(topic)}
      className={`p-3 border border-0.5 rounded-3xl ${isSelected ? "bg-primary border-primary" : "border-ink-gray"}`}
    >
      <Text
        className={`text-sm font-rubik ${isSelected && "text-white font-rubikMedium"}`}
      >
        {topic}
      </Text>
    </Pressable>
  );
};
