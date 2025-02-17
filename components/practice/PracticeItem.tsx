import { Course, Quiz } from "@/types/type";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import images from "@/constants/images";
import * as Progress from "react-native-progress";
import Button from "@/components/ui/Button";
import { submitQuiz } from "@/libs/firebase";

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

        <View className="absolute top-2 right-2">
          <Ionicons name="checkmark-circle" size={24} color="#999" />
        </View>
      </TouchableOpacity>

      <PracticeModal
        course={course}
        path={option.path}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default PracticeItem;

const PracticeModal = ({
  course,
  path,
  modalVisible,
  setModalVisible,
}: {
  course: Course;
  path: PracticePath;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) => {
  const width = Dimensions.get("screen").width * 0.8;

  const quizLength = course.quiz.length;

  const [correctNumber, setCorrectNumber] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnIndexChange = (current: number, correct: number) => {
    if (currentIndex === quizLength) {
      return;
    }

    setCurrentIndex((prev) => prev + current);
    setCorrectNumber((prev) => prev + correct);
  };

  const quizIndex = currentIndex + 1;
  const progressBar = quizIndex / course.quiz.length;

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 bg-ink-light h-screen">
        <Image source={images.wave} className="h-screen absolute top-0" />
        <View className="">
          <View className="flex-row items-center justify-between mt-20 px-12">
            <View className="flex-row gap-2 items-center">
              <Text className="font-rubikSemiBold text-2xl text-white">
                {correctNumber}
              </Text>
              <Ionicons name="star" size={24} color="yellow" />
            </View>

            <Text className="font-rubikSemiBold text-xl text-ink-light">
              {quizIndex} of {course.quiz.length}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="ml-4"
            >
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <View className="flex items-center mt-6 mb-16">
            <Progress.Bar progress={progressBar} color="white" width={width} />
          </View>
        </View>

        <View className="flex-1 flex items-center justify-center">
          <QuizzesContent
            courseId={course.id}
            quizzes={course.quiz}
            onIndexChange={handleOnIndexChange}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </Modal>
  );
};

const QuizzesContent = ({
  courseId,
  quizzes,
  onIndexChange,
  setModalVisible,
}: {
  courseId: string;
  quizzes: Quiz[];
  onIndexChange: (current: number, correct: number) => void;
  setModalVisible: (value: boolean) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [correctNumber, setCorrectNumber] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  const handleSelectOption = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    const currentQuiz = quizzes[currentIndex];
    const correctAnsIndex = currentQuiz.options.indexOf(currentQuiz.correctAns);
    setCorrectIndex(correctAnsIndex);

    const isAnswerCorrect = selectedIndex === correctAnsIndex ? 1 : 0;
    setCorrectNumber((prev) => prev + isAnswerCorrect);
    onIndexChange(0, isAnswerCorrect);
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedIndex(null);
      setCorrectIndex(null);

      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }

    onIndexChange(1, 0);
  };

  const handleFinish = async () => {
    const result = await submitQuiz(courseId, correctNumber);

    if (result.success) {
      Alert.alert("Success", result.data);
      setModalVisible(false);
    } else {
      Alert.alert("Error", result.error);
    }
  };

  const isSelected = (index: number) => {
    return selectedIndex === index;
  };

  const isCorrect = (index: number) => {
    return correctIndex === index;
  };

  const hasAnswered = () => {
    return correctIndex !== null;
  };

  return (
    <View className="items-center w-full h-full">
      <View className="w-full">
        <FlatList
          data={quizzes}
          ref={flatListRef}
          keyExtractor={(item) => item.question}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View className="w-screen items-center">
                <View className="w-[80%] items-center bg-white rounded-3xl px-8 pt-12 pb-16">
                  <Text className="font-rubikSemiBold text-2xl text-center">
                    {item.question}
                  </Text>

                  {item.options.map((option: string, index: number) => (
                    <TouchableOpacity
                      key={index}
                      className={`
                        flex-row w-full justify-between mt-6 items-center p-4 rounded-xl ${
                          isSelected(index)
                            ? "bg-primary/70"
                            : "bg-ink-lightGray"
                        }
                          ${isCorrect(index) && "bg-success"} 
                      `}
                      onPress={() => handleSelectOption(index)}
                      disabled={hasAnswered()}
                    >
                      <Text
                        className={`text-lg font-rubikMedium ${
                          isSelected(index) ? "text-white" : ""
                        } ${isCorrect(index) ? "text-white" : ""}`}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          }}
        />
      </View>

      <View className="absolute bottom-16 flex-1 w-full px-16 items-center">
        {hasAnswered() ? (
          currentIndex === quizzes.length - 1 ? (
            <Button title="Finish" onPress={handleFinish} />
          ) : (
            <Button title="Next" onPress={handleNext} />
          )
        ) : (
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={selectedIndex === null}
          />
        )}
      </View>
    </View>
  );
};
