import { themeValueState } from '../storage/themeValueStorage';
import { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { get, save } from '../storage/asyncStorage';

export type ThemeKey = 'light' | 'dark' | 'default';
export const useAppTheme = () => {
  const setThemeValue = useSetRecoilState(themeValueState);
  const systemTheme = useColorScheme() as ThemeKey;

  const setAppTheme = useCallback(async (theme: ThemeKey, isDefault: boolean) => {
    await save('Theme', theme);
    await save('IsDefault', isDefault);
    setThemeValue(theme);
  }, [setThemeValue]);

  const themeOperations = useCallback((theme: ThemeKey) => {
    switch (theme) {
      case 'dark':
        setAppTheme(theme, false);
        break;
      case 'light':
        setAppTheme(theme, false);
        break;
      case 'default':
        setAppTheme(systemTheme || 'light', true);
        break;
    }
  }, [setAppTheme, systemTheme]);

  const getAppTheme = useCallback(async () => {
    const theme = await get('Theme');
    const isDefault = await get('IsDefault');
    isDefault ? themeOperations('default') : themeOperations(theme as ThemeKey);
  }, [themeOperations]);

  return { getAppTheme, setAppTheme };
};
