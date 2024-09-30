import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemeKey } from '../../hooks/useAppTheme';
import { Colors } from '../../constants/Colors';
import { useRecoilValue } from 'recoil';
import { themeValueState } from '../../storage/themeValueStorage';

const Habits = () => {
  const themeValue = useRecoilValue(themeValueState);
  const styles = styling(themeValue);
  return <View style={styles.container}></View>;
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.themeColor || Colors.light.themeColor,
      justifyContent: "center",
      padding: 12,
    },
  });
export default Habits