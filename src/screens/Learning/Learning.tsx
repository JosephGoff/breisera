import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { ThemeKey } from "../../hooks/useAppTheme";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { themeValueState } from "../../storage/themeValueStorage";
import Header from "../../components/Header";
import CheckboxWithLabel from "../../components/Checkbox";
import { dayStatusState } from "../../storage/dayStatusStorage";
import { save } from "../../storage/asyncStorage";
import { AntDesign } from "@expo/vector-icons";

const Learning = () => {
  const themeValue = useRecoilValue(themeValueState);
  const [dayStatus, setDayStatus] = useRecoilState(dayStatusState);
  const styles = styling(themeValue);

  const handleCheckboxChange = (isChecked: boolean, label: string) => {
    // Set the global and async learningStatus
    if (dayStatus) {
      const newCheckBoxes = dayStatus.learning.checkboxes.map((item) =>
        item.label === label ? { ...item, isChecked: isChecked } : item
      );

      const newDayStatus = {
        ...dayStatus,
        learning: {
          ...dayStatus.learning,
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

  const resetLearningBoxes = () => {
    if (dayStatus) {
      const newDayStatus = {
        ...dayStatus,
        learning: {
          ...dayStatus.learning,
          checkboxes: dayStatus.learning.checkboxes.map((item) => ({
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
          <TouchableOpacity
            onPress={resetLearningBoxes}
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

          {dayStatus.learning.checkboxes.map((item, index) => (
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

export default Learning;
