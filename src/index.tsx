import * as ChartUtils from './common/utils/index';
import * as ChartHelpers from './common/helpers';
import * as ChartConstants from './common/constants';
import { CPChartsThemeDark, CPChartsThemeLight } from './common/theme';

import CPChartZoomOutButton from './components/CPChartZoomOutButton';
import CPChartShape from './components/CPChartShape';
import CPChartTooltip from './components/CPChartTooltip';

import { CPChartRect, ChartElementProps, ChartEvent } from './types/index';
import {
  InterpolationType,
  LabelPosition,
  SeriesType,
  UnitsSymbol,
} from './types/enums';

const cpChartsTheme = {
  light: CPChartsThemeLight,
  dark: CPChartsThemeDark,
};

export {
  cpChartsTheme,
  ChartHelpers,
  ChartUtils,
  ChartConstants,
  CPChartShape,
  CPChartTooltip,
  CPChartZoomOutButton,
};

export type {
  CPChartRect,
  ChartElementProps,
  ChartEvent,
  InterpolationType,
  UnitsSymbol,
  LabelPosition,
  SeriesType,
};
