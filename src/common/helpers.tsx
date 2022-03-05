import { Component, ComponentType, ReactElement, ReactNode } from "react";
import { Area, Bar, Line, ReferenceLine, Symbols } from "recharts";
import { LegendType, SymbolType } from "recharts/types/util/types";
import Shape from "../components/Shape";
import {
  ChartElementProps,
  ChartEvent,
  Rect,
  SeriesType,
  SymbolProps,
} from "../types";
import { hasValue } from "./utils";

// tooltip symbols
export const SymbolMap = {
  area: "line",
  bar: "square",
  line: "line",
};

export const componentMap: { [key: string]: ReactNode } = {
  line: Line,
  bar: Bar,
  area: Area,
  referenceLine: ReferenceLine,
};

type SeriesProps = ChartElementProps & ReactElement;

/**
 * Renders a chart series
 * @param chartSeriesProps
 * @returns
 */
export function renderSeries(chartSeriesProps: SeriesProps) {
  const ChartSeries = componentMap[
    chartSeriesProps.seriesType
  ] as ComponentType<
    {
      [key in SeriesType]: Component<ChartElementProps, unknown>;
    }
  >;
  return <ChartSeries {...chartSeriesProps} />;
}

export const getSymbolType = (symbolType: string): SymbolType | "line" => {
  if (symbolType === "line") {
    return "line";
  }
  return (
    ["circle", "diamond", "square"].includes(symbolType)
      ? (symbolType as LegendType)
      : "circle"
  ) as SymbolType;
};

export const renderSymbol = ({
  color,
  stackId,
  shape,
  type,
  strokeDasharray,
}: SymbolProps) => {
  const symbol = shape ?? type;
  if (!stackId && symbol === "line") {
    return <Shape type="line" fill={color} strokeDasharray={strokeDasharray} />;
  }
  return (
    <Symbols
      cx={5}
      cy={5}
      type={getSymbolType(symbol) as SymbolType}
      size={50}
      fill={color}
    />
  );
};
