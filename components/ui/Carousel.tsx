import {
  View,
  Text,
  ImageSourcePropType,
  Dimensions,
  FlatList,
  Animated,
  Image,
} from "react-native";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { onboardingContent } from "@/constants/onboarding";
import Button from "@/components/ui/Button";

export type CarouselProps<T> = {
  items: T[];
  buttonTitle?: string;
  renderItem: ({ item, index }: { item: T; index: number }) => any;
  onEnded: (isEnded: boolean) => void;
  goBackSignal?: boolean;
  onIndexChange?: (index: number) => void;
};

const Carousel = <T,>({
  items,
  buttonTitle = "Next",
  renderItem,
  onEnded,
  goBackSignal,
  onIndexChange,
}: CarouselProps<T>) => {
  const screenWidth = Dimensions.get("screen").width;
  const [paginationIndex, setPaginationIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNextPress = () => {
    if (paginationIndex < items.length - 1) {
      const nextIndex = paginationIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setPaginationIndex(nextIndex);
      onIndexChange?.(nextIndex);
    } else {
      onEnded(true);
    }
  };

  useEffect(() => {
    if (paginationIndex > 0) {
      const prevIndex = paginationIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setPaginationIndex(prevIndex);
      onIndexChange?.(prevIndex);
    }
  }, [goBackSignal]);

  return (
    <View className="items-center justify-center w-full h-full gap-12 mb-16">
      <View className="w-full">
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({ item, index }) => (
            <View className="w-screen overflow-hidden">
              {renderItem({ item, index })}
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          onScroll={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / screenWidth);
            setPaginationIndex(index);
            onIndexChange?.(index);
          }}
          className="flex-grow-0 w-screen overflow-hidden"
          scrollEventThrottle={16}
        />
      </View>

      <View className="flex-grow" />

      <View className="w-full px-12 gap-8">
        <View className="flex-row mt-8 h-8 justify-center items-center">
          {items.map((_, index) => (
            <Animated.View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === paginationIndex ? "bg-primary w-4" : "bg-ink-gray w-2"
              }`}
            />
          ))}
        </View>

        <Button title={buttonTitle} onPress={handleNextPress} />
      </View>
    </View>
  );
};
export default Carousel;
