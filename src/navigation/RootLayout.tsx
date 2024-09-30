import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Health from "../screens/Health/Health";
import Learning from "../screens/Learning/Learning";
import Progress from "../screens/Progress/Progress";
import Habits from "../screens/Habits/Habits";
import Profile from "../screens/Profile/Profile";
import { useRecoilValue } from "recoil";
import { themeValueState } from "../storage/themeValueStorage";
import { Colors, commonColor } from "../constants/Colors";
import RingProgress from "../components/RingProgress";
import { dayStatusState } from "../storage/dayStatusStorage";

const Tab = createBottomTabNavigator();

const RootLayout = () => {
  const themeValue = useRecoilValue(themeValueState);
  const dayStatus = useRecoilValue(dayStatusState);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          minHeight: 60,
          paddingTop: 10,
          backgroundColor:
            Colors[themeValue]?.themeColor || Colors.light.themeColor,
          paddingHorizontal: 9,
        },
        tabBarLabelStyle: {
          marginBottom: -9,
          paddingTop: 5,
          fontSize: 13,
          fontWeight: 400,
        },
        tabBarActiveTintColor:
          Colors[themeValue]?.themeDisplay || Colors.light.themeDisplay,
      }}
    >
      <Tab.Screen
        name="Health"
        component={Health}
        options={{
          title: "Health",
          headerShown: false,
          tabBarIcon: () => (
            <RingProgress
              radius={14}
              strokeWidth={5}
              progress={dayStatus.health.dayStatus}
              ringColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              ringFillColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              showArrow={false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{
          title: "Habits",
          headerShown: false,
          tabBarIcon: () => (
            <RingProgress
              radius={14}
              strokeWidth={5}
              progress={dayStatus.habits.dayStatus}
              ringColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              ringFillColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              showArrow={false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          title: "Progress",
          headerShown: false,
          tabBarIcon: () => (
            <RingProgress
              radius={14}
              strokeWidth={5}
              progress={dayStatus.progress.dayStatus}
              ringColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              ringFillColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              showArrow={false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Learning"
        component={Learning}
        options={{
          title: "Learning",
          headerShown: false,
          tabBarIcon: () => (
            <RingProgress
              radius={14}
              strokeWidth={5}
              progress={dayStatus.learning.dayStatus}
              ringColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              ringFillColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              showArrow={false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => (
            <RingProgress
              radius={14}
              strokeWidth={5}
              progress={dayStatus.all.dayStatus}
              ringColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              ringFillColor={
                Colors[themeValue]?.successGreen || Colors.light.successGreen
              }
              showArrow={false}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootLayout;
