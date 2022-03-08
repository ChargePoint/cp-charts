import { ThemeProvider } from "styled-components";
import { cpLightTheme, cpDarkTheme } from "@chargepoint/cp-toolkit";
import { CPChartsThemeLight } from "../src/common/theme";

import "../src/styles/storybook.css";

const lightTheme = {
  ...cpLightTheme,
  ...CPChartsThemeLight,
};

// Adds a global "Theme" switcher to Storybook toolbar
export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for storybook components",
    defaultValue: "Light",
    toolbar: {
      icon: "lightning",
      items: ["Light", "Dark"],
    },
  },
};

const getTheme = (themeName) => {
  if (themeName === "Dark") {
    return cpDarkTheme;
  }
  return lightTheme;
};

const withThemeProvider = (Story, context) => {
  const theme = getTheme(context.globals.theme);
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
