import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Health from "../screens/Health/Health";
import Learning from "../screens/Learning/Learning";
import Progress from "../screens/Progress/Progress";
import Habits from "../screens/Habits/Habits";
import Profile from "../screens/Profile/Profile";

const Tab = createBottomTabNavigator();

const HealthScreen: React.FC = () => {
  return (
    <View>
      <Text>This is the Health Screen</Text>
    </View>
  );
};

const RootLayout = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Health"
        component={Health}
        options={{ title: "Health", headerShown: false }}
      />
      <Tab.Screen
        name="Learning"
        component={Learning}
        options={{ title: "Learning", headerShown: false }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{ title: "Progress", headerShown: false }}
      />
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{ title: "Habits", headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default RootLayout;
