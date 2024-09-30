// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";

// import Health from "./src/screens/Health/Health";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Health />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     justifyContent: "center",
//     padding: 12,
//   },
// });


import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootLayout from './src/navigation/RootLayout';
import {save, get} from './src/storage/asyncStorage';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import {themeValueState} from './src/storage/themeValueStorage';

const App = () => {
  const setThemeValue = useSetRecoilState(themeValueState);

  const setAppTheme = useCallback(async () => {
    const theme = await get('Theme');
    if (theme) {
      save('Theme', theme);
      save('IsDefault', true);
      setThemeValue(theme);
    }
  }, [setThemeValue]);

  useEffect(() => {
    setAppTheme();
  }, [setAppTheme]);

  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
};

const withRecoilRoot = (Component: React.FC) => {
  const WrappedComponent: React.FC = () => {
    return (
      <RecoilRoot>
        <Component />
      </RecoilRoot>
    );
  };

  WrappedComponent.displayName = Component.displayName || Component.name;
  return WrappedComponent;
};

export default withRecoilRoot(App);
