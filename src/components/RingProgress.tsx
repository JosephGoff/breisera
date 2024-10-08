import { View } from 'react-native';
import SVG, { Circle, CircleProps } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useRecoilValue } from 'recoil';
import { themeValueState } from '../storage/themeValueStorage';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
  radius?: number;
  strokeWidth?: number;
  progress: number;
  ringColor: string;
  ringFillColor: string;
  showArrow: boolean;
};

const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress,
  ringColor,
  ringFillColor,
  showArrow = false
}: RingProgressProps) => {
  const themeValue = useRecoilValue(themeValueState);
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  const fill = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(progress, { duration: 1500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [circumference * fill.value, circumference],
  }));

  const circleDefaultProps: CircleProps = {
    r: innerRadius,
    cx: radius,
    cy: radius,
    originX: radius,
    originY: radius,
    strokeWidth: strokeWidth,
    strokeLinecap: 'round',
    rotation: '-90',
    fill: 'transparent',
  };

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: 'center',
        position: "relative"
      }}
    >
      <SVG>
        <Circle {...circleDefaultProps} stroke={ringColor} opacity={0.2} />
        <AnimatedCircle animatedProps={animatedProps} stroke={ringFillColor} {...circleDefaultProps} />
      </SVG>
      {showArrow && <AntDesign
        name="arrowright"
        size={strokeWidth * 0.6}
        color={Colors[themeValue]?.themeColor || Colors.light.themeColor}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: strokeWidth * 0.18,
        }}
      />}
      {/* {progress === 0 && <View style={{backgroundColor: ringFillColor, height: strokeWidth, width: 1, display: "flex", alignSelf: "center", position: "absolute", top: 0}}></View>} */}
    </View>
  );
};

export default RingProgress;