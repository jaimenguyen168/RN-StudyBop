import React, { useState, useRef } from "react";
import { View, Animated, TouchableWithoutFeedback } from "react-native";

interface AnimatedCardFlipProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

const AnimatedCardFlip: React.FC<AnimatedCardFlipProps> = ({
  frontContent,
  backContent,
  className,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Interpolations for flipping
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View className="relative w-[80%] h-full">
        {/* Front Side */}
        <Animated.View
          className="absolute w-full h-full"
          style={{
            transform: [{ rotateY: frontInterpolate }],
            opacity: isFlipped ? 0 : 1,
          }}
        >
          {frontContent}
        </Animated.View>

        {/* Back Side */}
        <Animated.View
          className="absolute w-full h-full"
          style={{
            transform: [{ rotateY: backInterpolate }],
            opacity: isFlipped ? 1 : 0,
          }}
        >
          {backContent}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedCardFlip;
