import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeValueState } from "../../storage/themeValueStorage";
import { ThemeKey } from "../../hooks/useAppTheme";
import { useAppTheme } from "../../hooks/useAppTheme";
import { dayStatusState } from "../../storage/dayStatusStorage";
import { save } from "../../storage/asyncStorage";
import CheckboxWithLabel from "../../components/Checkbox";

const Profile: React.FC = () => {
  const themeValue = useRecoilValue(themeValueState);
  const { setAppTheme } = useAppTheme();
  const [dayStatus, setDayStatus] = useRecoilState(dayStatusState);
  const styles = styling(themeValue);

  const handleCheckboxChange = (isChecked: boolean, label: string) => {
    // Set the global and async all status
    if (dayStatus) {
      const newCheckBoxes = dayStatus.all.checkboxes.map((item) =>
        item.label === label ? { ...item, isChecked: isChecked } : item
      );

      const newDayStatus = {
        ...dayStatus,
        all: {
          ...dayStatus.all,
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingBottom: 50, flex: 1, alignItems: "center", paddingTop: 250, paddingHorizontal: 20}}>
          {dayStatus.all.checkboxes.map((item, index) => (
            <CheckboxWithLabel
              key={index}
              label={item.label}
              onChange={handleCheckboxChange}
              checked={item.isChecked}
            />
          ))}

          {/* <TextInput
        style={styles.textInputStyle}
        placeholder="Type here"
        placeholderTextColor={Colors[themeValue]?.gray || Colors.light.gray}
      /> */}

          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              const newTheme = themeValue === "dark" ? "light" : "dark";
              setAppTheme(newTheme, false);
            }}
          >
            <Text style={styles.buttonTextStyle}>
              {themeValue === "dark" ? "Light" : "Dark"} Mode
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: Colors[theme]?.themeColor || Colors.light.themeColor,
    },
    touchableStyle: {
      backgroundColor: Colors[theme]?.sky || Colors.light.sky,
      padding: 10,
      borderRadius: 6,
      width: "100%",
      height: 57,
      justifyContent: "center",
      marginTop: 20,
    },
    buttonTextStyle: {
      textAlign: "center",
      color: Colors[theme]?.commonWhite || Colors.light.commonWhite,
      fontSize: 20,
      fontWeight: "500",
    },
  });

export default Profile;
