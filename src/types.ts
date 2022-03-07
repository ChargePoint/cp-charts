import { ReactElement } from 'react';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';

export enum SeriesType {
  Area = 'area',
  Bar = 'bar',
  Line = 'line',
  ReferenceLine = 'referenceLine',
}

// curve interpolation type for chart series
//  @see https://github.com/d3/d3-shape#curves
export enum InterpolationType {
  basis = 'basis',
  basisClosed = 'basisClosed',
  basisOpen = 'basisOpen',
  linear = 'linear',
  linearClosed = 'linearClosed',
  natural = 'natural',
  monotoneX = 'monotoneX',
  monotoneY = 'monotoneY',
  monotone = 'monotone',
  step = 'step',
  stepBefore = 'stepBefore',
  stepAfter = 'stepAfter',
}

// chart element is a generic type that can handle ChartSeries
export interface ChartElementProps {
  active?: boolean;
  dataKey?: string;
  fill?: string;
  fillOpacity?: number;
  isAnimationActive?: boolean;
  label?: ReactElement | string;
  seriesType?: SeriesType;
  stroke?: string;
  strokeWidth?: number;
  strokeDashArray?: string;
  strokeOpacity?: number;
  shape?: string;
  type?: string;
  unit?: string;
  x?: number | null;
  y?: number | null;
}

export interface TimeSeriesData {
  timestamp: number;
  [key: string]: unknown;
}

export interface SymbolProps {
  color: string;
  stackId?: string;
  shape: string;
  type?: string;
  strokeDasharray?: string;
}

export interface NumberFormatOptions {
  maximumSignificantDigits?: number;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  style?: 'unit' | 'currency' | 'percent';
  unit?: string;
}

export interface DataKeysProps {
  key: string;
  type?: SeriesType;
  unit?: string;
  color?: string;
}

export interface Rect {
  height?: number;
  width?: number;
  x1?: number | string;
  x2?: number | string;
  y1?: number | string;
  y2?: number | string;
}

export interface ChartEvent extends CategoricalChartState {
  chartX: number;
  chartY: number;
  activePayload: {
    payload: Record<string, number>;
  }[];
}
