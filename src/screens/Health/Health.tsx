import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Value from "../../components/Value";
import RingProgress from "../../components/RingProgress";
import { useState } from "react";
import useHealthData from "../../hooks/useHealthData";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeValueState } from "../../storage/themeValueStorage";
import { ThemeKey } from "../../hooks/useAppTheme";
import { Colors } from "../../constants/Colors";
import Header from "../../components/Header";
import { dayStatusState } from "../../storage/dayStatusStorage";
import { save } from "../../storage/asyncStorage";
import CheckboxWithLabel from "../../components/Checkbox";
import HR from "../../components/HR";

const STEPS_GOAL = 10_000;

export function Health() {
  const [date, setDate] = useState(new Date());
  const { steps, flights, distance } = useHealthData(date);
  const today = new Date().toDateString();

  const currentDate = new Date(date);
  const changeDate = (numDays: number) => {
    currentDate.setDate(currentDate.getDate() + numDays);
    setDate(currentDate);
  };

  const themeValue = useRecoilValue(themeValueState);
  const styles = styling(themeValue);
  const [dayStatus, setDayStatus] = useRecoilState(dayStatusState);

  const handleCheckboxChange = (isChecked: boolean, label: string) => {
    // Set the global and async health status
    if (dayStatus) {
      const newCheckBoxes = dayStatus.health.checkboxes.map((item) =>
        item.label === label ? { ...item, isChecked: isChecked } : item
      );

      const newDayStatus = {
        ...dayStatus,
        health: {
          ...dayStatus.health,
          checkboxes: newCheckBoxes,
          dayStatus:
            newCheckBoxes.filter((item) => item.isChecked).length /
            newCheckBoxes.length,
        },
      };

      setDayStatus(newDayStatus);
      save("dayStatusState", newDayStatus);
    }
  };

  const resetHealthBoxes = () => {
    if (dayStatus) {
      const newDayStatus = {
        ...dayStatus,
        health: {
          ...dayStatus.health,
          checkboxes: dayStatus.health.checkboxes.map((item) => ({
            ...item,
            isChecked: false,
          })),
          dayStatus: 0,
        },
      };

      setDayStatus(newDayStatus);
      save("dayStatusState", newDayStatus);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={{ paddingBottom: 50 }}>
          <View style={styles.datePicker}>
            <AntDesign
              onPress={() => changeDate(-1)}
              name="left"
              size={20}
              color={
                Colors[themeValue]?.themeDisplaySoft ||
                Colors.light.themeDisplaySoft
              }
            />
            <Text style={styles.date}>{date.toDateString()}</Text>

            {date.toDateString() !== today && (
              <AntDesign
                onPress={() => changeDate(1)}
                name="right"
                size={20}
                color={
                  Colors[themeValue]?.themeDisplaySoft ||
                  Colors.light.themeDisplaySoft
                }
              />
            )}
          </View>

          <TouchableOpacity
            onPress={resetHealthBoxes}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              backgroundColor:
                Colors[themeValue]?.themeColorSoftBG ||
                Colors.light.themeColorSoftBG,
              width: 35,
              height: 35,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 7,
              zIndex: 102,
            }}
          >
            <AntDesign
              name="reload1"
              size={20}
              style={{ marginTop: -2 }}
              color={
                Colors[themeValue]?.themeDisplaySoft ||
                Colors.light.themeDisplaySoft
              }
            />
          </TouchableOpacity>

          <RingProgress
            radius={80}
            strokeWidth={30}
            progress={steps / STEPS_GOAL}
            ringColor={
              Colors[themeValue]?.successGreen || Colors.light.successGreen
            }
            ringFillColor={
              Colors[themeValue]?.successGreen || Colors.light.successGreen
            }
            showArrow={true}
          />

          <View style={styles.values}>
            <Value label="Steps" value={steps.toString()} />
            <Value
              label="Distance"
              value={`${(distance / 1000).toFixed(2)} km`}
            />
            <Value label="Flights Climbed" value={flights.toString()} />
          </View>

          <HR />
          {dayStatus.health.checkboxes.map((item, index) => (
            <CheckboxWithLabel
              key={index}
              label={item.label}
              onChange={handleCheckboxChange}
              checked={item.isChecked}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.themeColor || Colors.light.themeColor,
    },
    values: {
      flexDirection: "row",
      gap: 25,
      flexWrap: "wrap",
      marginTop: 30,
      marginHorizontal: 28,
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
