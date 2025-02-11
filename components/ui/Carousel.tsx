import {
  View,
  Text,
  ImageSourcePropType,
  Dimensions,
  FlatList,
  Animated,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { onboardingContent } from "@/constants/static";
import Button from "@/components/ui/Button";

export type CarouselProps = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
};

const Carousel = ({
  items,
  onEnded,
}: {
  items: CarouselProps[];
  onEnded: (isEnded: boolean) => void;
}) => {
  const screenWidth = Dimensions.get("screen").width;
  const [paginationIndex, setPaginationIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  const handleNextPress = () => {
    if (paginationIndex < items.length - 1) {
      const nextIndex = paginationIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setPaginationIndex(nextIndex);
    } else {
      onEnded(true);
    }
  };

  return (
    <View className="flex-1 items-center justify-center w-full gap-12 mb-16">
      <View>
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({ item, index }) => (
            <View
              className="items-center justify-center px-12"
              style={{ width: screenWidth }}
            >
              <Image
                source={item.image}
                className="w-full h-[512px]"
                resizeMode="contain"
              />
              <View className="items-center gap-4">
                <Text className="text-3xl font-semibold text-center px-24">
                  {item.title}
                </Text>
                <Text className="text-base text-center text-ink-darkGray px-8">
                  {item.subtitle}
                </Text>
              </View>
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
          }}
          className="flex-grow-0"
          scrollEventThrottle={16}
        />
      </View>

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

      <View className="w-full px-12">
        <Button title="Next" onPress={handleNextPress} />
      </View>
    </View>
  );
};
export default Carousel;
