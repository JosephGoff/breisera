import { StyleSheet, Text, View } from "react-native";
import Value from "../../components/Value";
import RingProgress from "../../components/RingProgress";
import { useState } from "react";
import useHealthData from "../../hooks/useHealthData";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";
import { themeValueState } from "../../storage/themeValueStorage";
import { ThemeKey } from "../../hooks/useAppTheme";
import { Colors } from "../../constants/Colors";

const STEPS_GOAL = 10_000;

export function Health() {
  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate);
  };

  const themeValue = useRecoilValue(themeValueState);
  const styles = styling(themeValue);

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#C3FF53"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>

        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#C3FF53"
        />
      </View>

      <RingProgress
        radius={150}
        strokeWidth={50}
        progress={steps / STEPS_GOAL}
      />

      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
      </View>
    </View>
  );
}

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.themeColor || Colors.light.themeColor,
      justifyContent: "center",
      padding: 12,
    },
    values: {
      flexDirection: "row",
      gap: 25,
      flexWrap: "wrap",
      marginTop: 100,
      maxWidth: "70%",
    },
    datePicker: {
      alignItems: "center",
      padding: 20,
      flexDirection: "row",
      justifyContent: "center",
    },
    date: {
      color: Colors[theme]?.themeDisplay || Colors.light.themeDisplay,
      fontWeight: "500",
      fontSize: 20,
      marginHorizontal: 20,
    },
  });

export default Health;
