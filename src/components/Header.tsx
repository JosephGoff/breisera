import { StyleSheet, Text, View } from "react-native";
import { ThemeKey } from "../hooks/useAppTheme";
import { useRecoilValue } from "recoil";
import { themeValueState } from "../storage/themeValueStorage";
import { Colors, commonColor } from "../constants/Colors";
import RingProgress from "./RingProgress";
import useHealthData from "../hooks/useHealthData";
import { useState } from "react";

// type ValueProps = {
//   label: string;
//   value: string;
// };
const Header = () => {
  const themeValue = useRecoilValue(themeValueState);
  const styles = styling(themeValue);

  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.headerLeft}></View>
        <View style={styles.headerRight}>
          <RingProgress
            radius={19}
            strokeWidth={6}
            progress={steps / 10000}
            ringColor={Colors[themeValue]?.successGreen || Colors.light.successGreen}
            ringFillColor={Colors[themeValue]?.successGreen || Colors.light.successGreen}
            showArrow={false}
          />
        </View>
      </View>
    </View>
  );
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    headerContainer: {
      height: 50,
      width: "100%",
      paddingHorizontal: 3,
    },
    header: {
      height: "100%",
      width: "100%",
      backgroundColor:
        Colors[theme]?.themeColorSoft || Colors.light.themeColorSoft,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerRight: {
      backgroundColor:
        Colors[theme]?.themeColorSoft2 || Colors.light.themeColorSoft2,
      borderRadius: 7,
      marginRight: 6,
      width: 110,
    },
    headerLeft: {},
  });

export default Header;
