import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {useRecoilValue} from 'recoil';
import {themeValueState} from '../../storage/themeValueStorage';
import {ThemeKey} from '../../hooks/useAppTheme';
import {useAppTheme} from '../../hooks/useAppTheme';

const Profile: React.FC = () => {
  const themeValue = useRecoilValue(themeValueState);
  const {setAppTheme} = useAppTheme();
  const styles = styling(themeValue);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        This is a demo of default dark/light theme with switch/buttons using
        async storage.
      </Text>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Type here"
        placeholderTextColor={Colors[themeValue]?.gray || Colors.light.gray}
      />
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => {
          const newTheme = themeValue === 'dark' ? 'light' : 'dark';
          setAppTheme(newTheme, false);
        }}>
        <Text style={styles.buttonTextStyle}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: ThemeKey) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors[theme]?.themeColor || Colors.light.themeColor,
      paddingHorizontal: 20,
    },
    textStyle: {},
    textInputStyle: {
      borderColor: Colors[theme]?.gray || Colors.light.gray,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      width: '100%',
      marginTop: 20,
      color: Colors[theme]?.commonWhite || Colors.light.commonWhite,
    },
    touchableStyle: {
      backgroundColor: Colors[theme]?.sky || Colors.light.sky,
      padding: 10,
      borderRadius: 6,
      width: '100%',
      height: 57,
      justifyContent: 'center',
      marginTop: 20,
    },
    buttonTextStyle: {
      textAlign: 'center',
      color: Colors[theme]?.commonWhite || Colors.light.commonWhite,
      fontSize: 20,
      fontWeight: '500',
    },
  });

export default Profile;
