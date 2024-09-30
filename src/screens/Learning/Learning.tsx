import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { ThemeKey } from "../../hooks/useAppTheme";
import { useRecoilValue } from "recoil";
import { themeValueState } from "../../storage/themeValueStorage";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const Learning = () => {
  const themeValue = useRecoilValue(themeValueState);
  const styles = styling(themeValue);
  return <SafeAreaView style={styles.container}>
    <Header/>
  </SafeAreaView>;
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.themeColor || Colors.light.themeColor,
    },
  });

export default Learning;
