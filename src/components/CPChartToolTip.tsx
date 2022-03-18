import { FC } from 'react';
import styled from 'styled-components';
import { Surface } from 'recharts';
import { ThemeColors, ThemeConstants } from '@chargepoint/cp-toolkit';

import { FormatterFunc } from 'types/index';
import { ReChartsEventPayload } from 'types/recharts';

import { renderSymbol, SymbolMap } from '../common/helpers';
import { CPChartColors } from '../common/theme';
import { hasValue, parseReChartsEventProps } from '../common/utils';
import { Spacer } from './Styled';

const { spacing, fontSize, fontWeight } = ThemeConstants;

export interface CPChartTooltipOptions {
  opacity?: number;
}

export interface CPChartTooltipItem {
  key: string;
  label?: string;
  color?: string;
  value?: unknown;
  unit?: string;
  shape: string;
  strokeDasharray?: string;
}

export interface CPChartTooltipProps {
  items: CPChartTooltipItem[];
  payload: ReChartsEventPayload[];
  formatTimeStamp: (row: Record<string, number>) => string;
  formatter: FormatterFunc;
  // eslint-disable-next-line react/require-default-props
  type?: string;
}

const CustomTooltipWrapper = styled.div<{ opacity?: number }>`
  background: ${({ theme }) => theme.components.tooltip.bg};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  color: ${({ theme }) => theme.components.tooltip.text};
  border-radius: ${spacing.absolute.xs}px;
  border: 1px solid ${CPChartColors.lightGray};
  padding: ${spacing.absolute.s}px;
  font-size: ${fontSize.text_12}rem;
`;

const TooltipTitle = styled.div`
  margin: ${spacing.absolute.xs}px;
  margin-left: ${spacing.absolute.m + spacing.absolute.xs}px;
  margin-top: ${spacing.absolute.m}px;
  font-size: ${fontSize.text_12}rem;
  color: ${ThemeColors.gray_50};
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
    unit = '',
  }: CPChartTooltipItem,
  formatter?: FormatterFunc
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
