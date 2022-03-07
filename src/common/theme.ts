import { ThemeColors } from '@chargepoint/cp-toolkit';

export const CPChartColors = {
  white: ThemeColors.white,
  lightGray: ThemeColors.gray_10,
  gray: ThemeColors.gray_40,
  darkGray: ThemeColors.gray_50,
  orange: ThemeColors.orange_50,
  // charting colors used in mockups, but not used anywhere else
  lightGreen: '#C7CFC0',
  turquoiseBlue: '#20D0C9',
  lightPurple: '#C67FBD',
  pink: '#DD5182',
  lightOrange: '#FF6E54',
  darkPurple: '#444E86',
  darkYellow: '#FFA600',
  lightBlue: ThemeColors.blue_30,
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
