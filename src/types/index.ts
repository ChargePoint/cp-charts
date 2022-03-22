import { ReactElement } from 'react';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { SeriesType } from './enums';

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
  strokeDasharray?: string;
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

export interface CPChartRect {
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

export type FormatterFunc = (
  row: string | Record<string, number>,
  value: number | string
) => string;
