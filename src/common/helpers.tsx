import { ComponentType, ReactElement, ReactNode } from 'react';
import { Area, Bar, Line, ReferenceLine, Symbols } from 'recharts';
import { LegendType, SymbolType } from 'recharts/types/util/types';
import { ChartElementProps, SymbolProps } from '../types';
import Shape from '../components/CPChartShape';

// tooltip symbols
export const SymbolMap = {
  area: 'line',
  bar: 'square',
  line: 'line',
};

export enum SymbolTypes {
  CIRCLE = 'circle',
  DIAMOND = 'diamond',
  LINE = 'line',
  SQUARE = 'square',
}

export const componentMap: { [key: string]: ReactNode } = {
  line: Line,
  bar: Bar,
  area: Area,
  referenceLine: ReferenceLine,
};

type SeriesProps = ChartElementProps & ReactElement;

/**
 * Renders a chart series
 * Supported Types: Area, Line, Bar
 * @param chartSeriesProps
 * @returns
 */
export function renderSeries(chartSeriesProps: SeriesProps) {
  const ChartSeries = componentMap[
    chartSeriesProps.seriesType
  ] as ComponentType<ChartElementProps>;
  return <ChartSeries {...(chartSeriesProps as ChartElementProps)} />;
}

/**
 * Always returns a SymbolType. Defaults to 'circle'
 * @returns
 */
export const getSymbolType = (symbolType: SymbolTypes): SymbolType | 'line' => {
  const allSymbols = Object.values(SymbolTypes);
  return (
    allSymbols.includes(symbolType)
      ? (symbolType as LegendType)
      : SymbolTypes.CIRCLE
  ) as SymbolType;
};

/**
 * Renders shape symbol
 * Used with ReferenceLine, ToolTip, and Legend components
 */
export const renderSymbol = ({
  color,
  stackId,
  shape,
  type,
  strokeDasharray,
}: SymbolProps) => {
  const symbol = shape ?? type;
  if (!stackId && symbol === SymbolTypes.LINE) {
    return <Shape type="line" fill={color} strokeDasharray={strokeDasharray} />;
  }
  return (
    <Symbols
      cx={5}
      cy={5}
      type={getSymbolType(symbol as SymbolTypes) as SymbolType}
      size={50}
      fill={color}
    />
  );
};
