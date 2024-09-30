export const commonColor = {
  commonWhite: '#FFFFFF',
  commonBlack: '#000000',
};

const light = {
  successGreen: '#41C755',
  themeColor: '#FFFFFF',
  themeColorSoft: '#DDDDDD',
  themeColorSoft2: '#eeeeee',
  themeDisplay: '#000000',
  themeDisplay2: '#000000',
  sky: '#87CEEB',
  text: '#ECEDEE',
  tint: '#0a7ea4',
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: '#0a7ea4',
  ...commonColor,
};
const dark = {
  successGreen: '#60FF77',
  themeColor: '#000000',
  themeColorSoft: '#222222',
  themeColorSoft2: '#111111',
  themeDisplay: "#FFFFFF",
  themeDisplay2: "#FFFFFF",
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
