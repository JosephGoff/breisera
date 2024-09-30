import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { useRecoilValue } from 'recoil';
import { themeValueState } from '../storage/themeValueStorage';
import { ThemeKey } from '../hooks/useAppTheme';

export type CheckboxWithLabelProps = {
  label: string;
  onChange: (checked: boolean, label: string) => void;
  checked: boolean;
};

const CheckboxWithLabel = ({ label, onChange, checked }: CheckboxWithLabelProps) => {
  const themeValue = useRecoilValue(themeValueState);
  const styles = styling(themeValue);

  return (
    <TouchableOpacity style={styles.container} onPress={()=>{onChange(!checked, label)}}>
      <View style={[styles.checkbox, checked && styles.checked, !checked && styles.unchecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 5,
    borderColor: "transparent",
  },
  unchecked: {
    borderColor: Colors[theme]?.themeColorSoft2 || Colors.light.themeColorSoft2,
  },
  checked: {
    backgroundColor: Colors[theme]?.successGreen || Colors.light.successGreen,
  },
  checkmark: {
    color: Colors[theme]?.themeColor || Colors.light.themeColor,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: Colors[theme]?.themeDisplay || Colors.light.themeDisplay,
  },
});

export default CheckboxWithLabel;