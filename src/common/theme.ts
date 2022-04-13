import { ThemeColors, ThemeSchema } from '@chargepoint/cp-toolkit';
import { cpLightTheme, cpDarkTheme } from '@chargepoint/cp-toolkit';

export interface TooltipTheme {
  bg: string;
  border: string;
  label: string;
  value: string;
  opacity: string;
  title: string;
}

// in most UI cases we will just use colors from the cp-toolkit approved color palette, but datavis requires many more colors.
// UX has not really provided much guidance around this, so we will just create our own for now
export const CPChartColors = {
  white: ThemeColors.white,
  lightGray: ThemeColors.gray_10,
  lightGreen: '#C7CFC0',
  lightBlue: ThemeColors.blue_30,
  gray: ThemeColors.gray_40,
  darkGray: ThemeColors.gray_50,
  orange: ThemeColors.orange_50,
  darkOrange: '#D35400',
  turquoiseBlue: '#20D0C9',
  lightPurple: '#C67FBD',
  pink: '#DD5182',
  darkPurple: '#444E86',
  darkYellow: '#FFA600',
  lightOrange: '#FF6E54',
  blue: ThemeColors.blue_50,
};

export const CPChartsThemeLight = {
  ...cpLightTheme,
  components: {
    tooltip: {
      bg: ThemeColors.white,
      border: ThemeColors.gray_10,
      label: ThemeColors.gray_70,
      value: ThemeColors.gray_50,
      opacity: 'rgba(255, 255, 255, 0.1)',
      title: ThemeColors.gray_40,
    },
  },
};

export const CPChartsThemeDark = {
  ...cpDarkTheme,
  components: {
    tooltip: {
      bg: ThemeColors.gray_70,
      border: ThemeColors.gray_90,
      label: ThemeColors.white,
      value: ThemeColors.gray_10,
      opacity: 'rgba(0, 0, 0, 0.1)',
      title: ThemeColors.gray_05,
    },
  },
};

export interface CPChartsThemeSchema extends ThemeSchema {
  components: {
    tooltip: TooltipTheme;
  };
}
