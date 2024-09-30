import { atom } from 'recoil';
import { ThemeKey } from '../hooks/useAppTheme';

export const themeValueState = atom<ThemeKey>({
  key: 'themeValue',
  default: 'light',
});
