import React from "react";
import { View } from "react-native";
import { Colors } from "../constants/Colors";
import { useRecoilValue } from "recoil";
import { themeValueState } from "../storage/themeValueStorage";

const HR = () => {
  const themeValue = useRecoilValue(themeValueState);

  return (
    <View
      style={{
        marginTop: 20,
        height: 1,
        width: "92%",
        marginLeft: "4%",
        borderRadius: 3,
        backgroundColor:
          Colors[themeValue]?.themeDisplay || Colors.light.themeDisplay,
      }}
    />
  );
};

export default HR;
