import { Course, Flashcard, Quiz } from "@/types/type";
import { PracticeOption, PracticePath } from "@/constants/options";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import QuizModal from "@/components/practice/QuizModal";
import images from "@/constants/images";
import * as Progress from "react-native-progress";
import { router } from "expo-router";
import Button from "@/components/ui/Button";
import AnimatedCardFlip from "@/components/ui/AnimatedCardFlip";

const PracticeItem = ({
  course,
  option,
  index,
}: {
  course: Course;
  option: PracticeOption;
  index: number;
}) => {
  const { icon, path } = option;
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = () => {
    setModalVisible(true);
  };

  return (
    <View className="w-1/2 p-2">
      <TouchableOpacity
        onPress={handleItemPress}
        className={`items-center mt-8 rounded-3xl gap-3 p-4 mx-4 bg-white shadow-xl shadow-gray-200 ${
          index % 2 === 0 ? "ml-10" : "mr-10"
        }`}
      >
        <Image
          source={icon as any}
          className="w-full h-[100px]"
          resizeMode="contain"
        />
        <Text className="font-rubikLight text-sm text-center" numberOfLines={2}>
          {course.courseTitle}
        </Text>

        {path === PracticePath.QUIZ && (
          <Text
            className={`font-rubikMedium ${
              course.correctCount === 0
                ? "text-ink-darkGray"
                : course.correctCount === course.quiz.length
                  ? "text-success"
                  : "text-primary"
            }`}
          >
            {course.correctCount}/{course.quiz.length}
          </Text>
        )}

        <View className="absolute top-2 right-2">
          <Ionicons name="checkmark-circle" size={24} color={"#999"} />
        </View>
      </TouchableOpacity>

      {path === PracticePath.QUIZ ? (
        <QuizModal
          course={course}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : path === PracticePath.FLASHCARDS ? (
        <FlashcardModal
          course={course}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
    </View>
  );
};

export default PracticeItem;

const FlashcardModal = ({
  course,
  modalVisible,
  setModalVisible,
}: {
  course: Course;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) => {
  const width = Dimensions.get("screen").width * 0.8;

  const flashcardsLength = course.quiz.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnIndexChange = (current: number) => {
    if (currentIndex === flashcardsLength) {
      return;
    }

    setCurrentIndex(current);
  };

  const handleCloseModal = () => {
    setCurrentIndex(0);
    setModalVisible(false);
  };

  const flashcardIndex = currentIndex + 1;
  const progressBar = flashcardIndex / flashcardsLength;

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 h-screen bg-ink-lightGray">
        <Image source={images.wave} className="h-screen absolute top-0" />

        <View>
          <View className="flex-row items-center justify-between mt-20 px-12">
            <Text className="font-rubikSemiBold text-xl text-ink-light">
              {flashcardIndex} of {flashcardsLength}
            </Text>

            <TouchableOpacity onPress={handleCloseModal} className="ml-4">
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex items-center mt-6 mb-16">
            <Progress.Bar progress={progressBar} color="white" width={width} />
          </View>
        </View>

        <View className="flex-1 flex items-center justify-center">
          <FlashcardsContent
            flashcards={course.flashcards}
            onIndexChange={handleOnIndexChange}
          />
        </View>
      </View>
    </Modal>
  );
};

const FlashcardsContent = ({
  flashcards,
  onIndexChange,
}: {
  flashcards: Flashcard[];
  onIndexChange: (current: number) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get("screen").width;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }

    onIndexChange(currentIndex);
  };

  const handleFinish = async () => {
    router.back();
  };

  return (
    <View className="items-center w-full h-full">
      <View className="w-full">
        <FlatList
          data={flashcards}
          ref={flatListRef}
          keyExtractor={(item) => item.front}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffsetX / screenWidth);
            setCurrentIndex(index);
            onIndexChange(index);
          }}
          scrollEventThrottle={16}
          renderItem={({ item }) => {
            return (
              <View className="w-screen items-center">
                <AnimatedCardFlip
                  frontContent={
                    <View className="w-full h-[500px] items-center justify-center bg-warning rounded-3xl">
                      <Text className="text-4xl font-rubikMedium text-center">
                        {item.front}
                      </Text>
                    </View>
                  }
                  backContent={
                    <View className="w-full h-[500px] items-center justify-center bg-white rounded-3xl">
                      <Text className="text-3xl font-rubikLight text-center">
                        {item.back}
                      </Text>
                    </View>
                  }
                  className="my-4"
                />
              </View>
            );
          }}
        />
      </View>

      <View className="absolute bottom-16 flex-1 w-full px-16 items-center">
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};
