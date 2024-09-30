const commonColor = {
  commonWhite: '#FFFFFF',
  commonBlack: '#000000',
};

const light = {
  gray: '#A0A0A0',
  themeColor: '#F5F5F5',
  sky: '#87CEEB',
  text: '#ECEDEE',
  tint: '#0a7ea4',
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: '#0a7ea4',
  ...commonColor,
};
const dark = {
  gray: '#777777',
  themeColor: '#000000',
  sky: '#1E1E1E',
  text: '#ECEDEE',
  tint: '#fff',
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: '#fff',
  ...commonColor,
};

export const Colors = {
  light,
  dark,
  default: light,
};
