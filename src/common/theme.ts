import { ThemeColors } from '@chargepoint/cp-toolkit';

export const CPChartColors = {
  white: ThemeColors.white,
  lightGray: ThemeColors.gray_10,
  lightGreen: '#C7CFC0',
  lightBlue: ThemeColors.blue_30,
  gray: ThemeColors.gray_40,
  darkGray: ThemeColors.gray_50,
  orange: ThemeColors.orange_50,
  turquoiseBlue: '#20D0C9',
  lightPurple: '#C67FBD',
  pink: '#DD5182',
  darkPurple: '#444E86',
  darkYellow: '#FFA600',
  lightOrange: '#FF6E54',
  blue: ThemeColors.blue_50,
};

export const CPChartsThemeLight = {
  components: {
    tooltip: {
      bg: ThemeColors.white,
      border: CPChartColors.gray,
      text: CPChartColors.darkGray,
      opacity: 'rgba(255, 255, 255, 0.1)',
    },
  },
};
