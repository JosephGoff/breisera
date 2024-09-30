import React, { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootLayout from "./src/navigation/RootLayout";
import { save, get } from "./src/storage/asyncStorage";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { themeValueState } from "./src/storage/themeValueStorage";
import { dayStatusState } from "./src/storage/dayStatusStorage";

const App = () => {
  // Set the theme state from async storage
  const setThemeValue = useSetRecoilState(themeValueState);
  const setAppTheme = useCallback(async () => {
    const theme = await get("Theme");
    if (theme) {
      save("Theme", theme);
      save("IsDefault", true);
      setThemeValue(theme);
    }
  }, [setThemeValue]);
  useEffect(() => {
    setAppTheme();
  }, [setAppTheme]);

  // Set the day status state from async storage
  const setDayStatusState = useSetRecoilState(dayStatusState);
  const setAppDayStatusState = useCallback(async () => {
    const dayStatusState = await get("dayStatusState");
    if (dayStatusState) {
      save("dayStatusState", dayStatusState);
      setDayStatusState(dayStatusState);
    }
  }, [setDayStatusState]);
  useEffect(() => {
    setAppDayStatusState();
  }, [setAppDayStatusState]);

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
