import { ThemeProvider } from 'styled-components';
import { CPChartsThemeLight, CPChartsThemeDark } from '../src/common/theme';

import '../src/styles/storybook.css';

const lightTheme = {};

// Adds a global "Theme" switcher to Storybook toolbar
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for storybook components',
    defaultValue: 'Light',
    toolbar: {
      icon: 'lightning',
      items: ['Light', 'Dark'],
    },
  },
};

const getTheme = (themeName) => {
  console.log('getTheme', themeName);
  if (themeName.toLowerCase() === 'dark') {
    return CPChartsThemeDark;
  }
  return CPChartsThemeLight;
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
