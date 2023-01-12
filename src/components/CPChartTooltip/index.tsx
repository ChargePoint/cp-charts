/* eslint-disable react/require-default-props */
import { FC } from 'react';
import { Surface } from 'recharts';
import { ThemeConstants } from '@chargepoint/cp-toolkit';

import { FormatterFunc } from 'types/index';
import { ReChartsEventPayload } from 'types/recharts';

import { renderSymbol } from '@common/helpers';
import { parseReChartsEventProps } from '@common/utils';
import { Spacer } from '../Styled';
import { combineToolTipItems, mapToolTipItems } from './utils';
import {
  Label,
  List,
  TooltipSeriesSymbol,
  Value,
  CustomTooltipWrapper,
  TooltipTitle,
} from './index.styles';

const { spacing } = ThemeConstants;

export interface CPChartTooltipOptions {
  opacity?: number;
}

export interface CPChartTooltipItem {
  color?: string;
  key: string;
  label?: string;
  shape: string;
  strokeDasharray?: string;
  unit?: string;
  value?: unknown;
}

export function renderSeriesItem(
  { color, key, label, shape, strokeDasharray, value, unit = '' }: CPChartTooltipItem,
  formatter?: FormatterFunc
) {
  const format = (): string => {
    return formatter ? formatter(key, value as number) : `${value} ${unit}`;
  };
  const symbolSize = 10;
  if (color) {
    return (
      <>
        <TooltipSeriesSymbol>
          <Surface
            width={symbolSize}
            height={symbolSize}
            viewBox={{ x: 0, y: 0, width: symbolSize, height: symbolSize }}
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

export interface CPChartTooltipProps {
  className?: string;
  items?: CPChartTooltipItem[];
  mode?: 'mergeItemsWithPayload';
  payload: ReChartsEventPayload[];
  timeStampFormatter: (row: Record<string, number>) => string;
  valueFormatter: FormatterFunc;
  type?: string;
}

/**
 * Out of the box, the CPChartTooltip will inspect the chart event payload and attempt to render each tooltip item from that.
 * - if an `items` array is present, it will be used to render the data that is displayed in the tooltip.
 * - if mode === 'mergeItemsWithPayload', it will merge the payload with the items array and strip any duplicates.
 *   `items` array entries will override those in the payload
 * @param props
 * @returns
 */
const CPChartTooltip: FC<CPChartTooltipProps> = (props) => {
  const { className, timeStampFormatter, valueFormatter, items, mode, payload, type } = props;
  if (payload && payload.length) {
    const row = payload[0].payload as Record<string, number>;

    const mappedFields: CPChartTooltipItem[] = (() => {
      if (mode === 'mergeItemsWithPayload' && items && payload) {
        return combineToolTipItems(payload, items, row, type);
      }
      return items ? mapToolTipItems(items, row, type) : parseReChartsEventProps(props);
    })();

    return (
      <CustomTooltipWrapper className={className}>
        <List>
          {mappedFields?.map((field) => (
            <li key={field.label}>{renderSeriesItem(field, valueFormatter)}</li>
          ))}
        </List>
        {timeStampFormatter && <TooltipTitle>{timeStampFormatter(row)}</TooltipTitle>}
      </CustomTooltipWrapper>
    );
  }

  return null;
};

export * as utils from './utils';

export default CPChartTooltip;
