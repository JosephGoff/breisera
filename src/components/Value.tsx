import { StyleSheet, Text, View } from "react-native";
import { ThemeKey } from "../hooks/useAppTheme";
import { useRecoilValue } from "recoil";
import { themeValueState } from "../storage/themeValueStorage";
import { Colors } from "../constants/Colors";

type ValueProps = {
  label: string;
  value: string;
};
const Value = ({ label, value }: ValueProps) => {
  const themeValue = useRecoilValue(themeValueState);
  const styles = styling(themeValue);
  return (
    <View style={styles.valueContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    valueContainer: {
      marginVertical: 5,
    },
    label: {
      color: Colors[theme]?.themeDisplay || Colors.light.themeDisplay,
      fontSize: 20,
    },
    value: {
      fontSize: 25,
      color: Colors[theme]?.themeDisplaySoft || Colors.light.themeDisplaySoft,
      fontWeight: "500",
    },
  });

export default Value;
