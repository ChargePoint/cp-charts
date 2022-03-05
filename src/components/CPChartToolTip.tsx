import { FC } from "react";
import styled from "styled-components";

import { ThemeColors, ThemeConstants } from "@chargepoint/cp-toolkit";
import { Surface } from "recharts";
import { renderSymbol, SymbolMap } from "../common/helpers";
import { CPChartColors } from "../common/theme";
import { DataKeysProps } from "../types";
import { hasValue, parseReChartsEventProps } from "../common/utils";
import { Spacer } from "./Styled";

const { spacing, fontSize, fontWeight } = ThemeConstants;

export interface CPChartTooltipOptions {
  opacity?: number;
}

export interface CPChartTooltipProps {
  items: DataKeysProps[];
  payload: {
    color: string;
    payload: Record<string, number>;
  }[];
  xAxisKey: string;
  options?: CPChartTooltipOptions;
  formatTimeStamp: (row: Record<string, number>) => string;
  formatter: (row: Record<string, number>) => string;
}

export interface CPChartTooltipItem {
  key: string;
  label?: string;
  color?: string;
  value?: unknown;
  unit?: string;
  shape: string;
  strokeDashArray?: string;
}

const CustomTooltipWrapper = styled.div<{ opacity?: number }>`
  background: ${({ opacity }) =>
    opacity ? `rgba(0, 0, 0, ${opacity})` : `rgba(0, 0, 0, 0.8)`};
  color: #fff;
  border-radius: ${spacing.absolute.xs}px;
  border: 1px solid ${CPChartColors.gray};
  padding: ${spacing.absolute.s}px;
  font-size: ${fontSize.text_12}rem;
`;

const TooltipTitle = styled.div`
  margin: ${spacing.absolute.xs}px;
  margin-left: ${spacing.absolute.m + spacing.absolute.xs}px;
  margin-top: ${spacing.absolute.m}px;
  font-size: ${fontSize.text_12}rem;
  color: ${ThemeColors.gray_40};
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    display: flex;
    align-items: center;
    padding: ${spacing.absolute.xxs}px;
    margin-bottom: ${spacing.absolute.xs}px;
  }
`;

const TooltipSeriesSymbol = styled.span`
  cursor: pointer;
  margin-right: ${spacing.absolute.s}px;
`;

const Label = styled.span`
  font-weight: ${fontWeight.bold};
  margin-right: ${spacing.absolute.xs}px;
`;

const Value = styled.span`
  color: ${ThemeColors.gray_40};
`;

function renderSeriesItem(
  {
    color,
    key,
    label,
    shape,
    strokeDasharray,
    value,
    unit,
  }: CPChartTooltipItem,
  formatter?: (key: string, val: number) => string
) {
  const format = (): string => {
    return formatter ? formatter(key, value as number) : `${value} ${unit}`;
  };
  if (color) {
    return (
      <>
        <TooltipSeriesSymbol>
          <Surface
            width={10}
            height={10}
            viewBox={{ x: 0, y: 0, width: 10, height: 10 }}
          >
            {renderSymbol({ color, shape, strokeDasharray })}
          </Surface>
        </TooltipSeriesSymbol>
        <Label>{label}:</Label>
        <Value>{format()}</Value>
      </>
    );
  }

  return (
    <>
      <Spacer size={spacing.absolute.m + spacing.absolute.xxs} />
      <Label>{label}:</Label>
      <Value>{format()}</Value>
    </>
  );
}

const CPChartTooltip: FC<CPChartTooltipProps> = (props) => {
  const { items, payload, formatTimeStamp, formatter, type } = props;
  if (payload && payload.length) {
    const row = payload[0].payload as Record<string, number>;
    const mappedFields: CPChartTooltipItem[] = items
      ? items
          .filter((v) => hasValue(v))
          .map((item) => {
            const { key, shape } = item;
            return {
              ...item,
              shape: shape ?? SymbolMap[type],
              value: row[key],
            };
          })
          .filter((item) => hasValue(item.value))
      : parseReChartsEventProps(props);
    return (
      <CustomTooltipWrapper>
        <List>
          {mappedFields?.map((field) => (
            <li key={field.label}>{renderSeriesItem(field, formatter)}</li>
          ))}
        </List>
        {formatTimeStamp && <TooltipTitle>{formatTimeStamp(row)}</TooltipTitle>}
      </CustomTooltipWrapper>
    );
  }

  return null;
};

export default CPChartTooltip;
