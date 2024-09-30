import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Text, View} from 'react-native';
import Health from '../screens/Health/Health';
import Home from '../screens/Home/Home';

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
        name="Home"
        component={Home}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="Health"
        component={HealthScreen}
        options={{title: 'Health'}}
      />
    </Tab.Navigator>
  );
};

export default RootLayout;
