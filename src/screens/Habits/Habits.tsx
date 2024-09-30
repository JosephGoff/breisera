import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { ThemeKey } from "../../hooks/useAppTheme";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeValueState } from "../../storage/themeValueStorage";
import Header from "../../components/Header";
import CheckboxWithLabel from "../../components/Checkbox";
import { dayStatusState } from "../../storage/dayStatusStorage";
import { save } from "../../storage/asyncStorage";
import HR from "../../components/HR";
import { AntDesign } from "@expo/vector-icons";

const Habits = () => {
  const themeValue = useRecoilValue(themeValueState);
  const [dayStatus, setDayStatus] = useRecoilState(dayStatusState);
  const styles = styling(themeValue);

  const handleCheckboxChange = (isChecked: boolean, label: string) => {
    // Set the global and async habits status
    if (dayStatus) {
      const newCheckBoxes = dayStatus.habits.checkboxes.map((item) =>
        item.label === label ? { ...item, isChecked: isChecked } : item
      );

      const newDayStatus = {
        ...dayStatus,
        habits: {
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

  const resetHabitsBoxes = () => {
    if (dayStatus) {
      const newDayStatus = {
        ...dayStatus,
        habits: {
          ...dayStatus.habits,
          checkboxes: dayStatus.habits.checkboxes.map((item) => ({
            ...item,
            isChecked: item.negative? true : false,
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
          <TouchableOpacity
            onPress={resetHabitsBoxes}
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

          <Text
            style={{
              width: "100%",
              color:
                Colors[themeValue]?.themeDisplay || Colors.light.themeDisplay,
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "arial",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            POSITIVES
          </Text>
          {dayStatus.habits.checkboxes
            .filter((item) => item.nonNegotiable && !item.negative)
            .map((item, index) => (
              <CheckboxWithLabel
                key={index}
                label={item.label}
                onChange={handleCheckboxChange}
                checked={item.isChecked}
              />
            ))}
          <HR />
          {dayStatus.habits.checkboxes
            .filter((item) => !item.nonNegotiable && !item.negative)
            .map((item, index) => (
              <CheckboxWithLabel
                key={index}
                label={item.label}
                onChange={handleCheckboxChange}
                checked={item.isChecked}
              />
            ))}
          <Text
            style={{
              width: "100%",
              color:
                Colors[themeValue]?.themeDisplay || Colors.light.themeDisplay,
              fontSize: 25,
              fontWeight: "bold",
              fontFamily: "arial",
              marginTop: 40,
              textAlign: "center",
            }}
          >
            NEGATIVES
          </Text>
          <HR />

          {dayStatus.habits.checkboxes
            .filter((item) => item.nonNegotiable && item.negative)
            .map((item, index) => (
              <CheckboxWithLabel
                key={index}
                label={item.label}
                onChange={handleCheckboxChange}
                checked={item.isChecked}
              />
            ))}
          <HR />
          {dayStatus.habits.checkboxes
            .filter((item) => !item.nonNegotiable && item.negative)
            .map((item, index) => (
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
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.themeColor || Colors.light.themeColor,
    },
  });

export default Habits;
