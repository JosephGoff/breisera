import React from "react";
import { Text, View } from "react-native";
import SVG, { Circle } from "react-native-svg";

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
};

const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress,
}: RingProgressProps) => {
  const color = "#EE0F55";
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <SVG>
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />
        <Circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill={'transparent'}
          strokeDasharray={[circumference * progress, circumference]}
          strokeLinecap="round"
          rotation="-90"
          originX={radius}
          originY={radius}
        />
      </SVG>
    </View>
  );
};

export default RingProgress;
