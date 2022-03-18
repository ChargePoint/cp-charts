/* eslint-disable react/function-component-definition */
import { ThemeColors, ThemeConstants } from '@chargepoint/cp-toolkit';
import { extent } from 'd3-array';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { CPChartColors } from '../common/theme';

const data = [
  { hour: '12a', index: 1, value: 170 },
  { hour: '1a', index: 1, value: 180 },
  { hour: '2a', index: 1, value: 150 },
  { hour: '3a', index: 1, value: 120 },
  { hour: '4a', index: 1, value: null },
  { hour: '5a', index: 1, value: null },
  { hour: '6a', index: 1, value: 400 },
  { hour: '7a', index: 1, value: 200 },
  { hour: '8a', index: 1, value: 100 },
  { hour: '9a', index: 1, value: 150 },
  { hour: '10a', index: 1, value: 160 },
  { hour: '11a', index: 1, value: 170 },
  { hour: '12a', index: 1, value: 180 },
  { hour: '1p', index: 1, value: 144 },
  { hour: '2p', index: 1, value: 166 },
  { hour: '3p', index: 1, value: 145 },
  { hour: '4p', index: 1, value: 95 },
  { hour: '5p', index: 1, value: 170 },
  { hour: '6p', index: 1, value: 180 },
  { hour: '7p', index: 1, value: 80 },
  { hour: '8p', index: 1, value: 99 },
  { hour: '9p', index: 1, value: 85 },
  { hour: '10p', index: 1, value: 170 },
  { hour: '11p', index: 1, value: 180 },
];

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: ${ThemeConstants.spacing.absolute.s}px;
`;

const ToolTipContainer = styled.div`
  background: ${ThemeColors.white}cc;
  box-shadow: 0 0 4px 0px rgba(100, 100, 100, 0.2);
  padding: ${ThemeConstants.spacing.absolute.m}px;
  border-radius: ${ThemeConstants.spacing.absolute.s}px;
  border: 1px solid ${CPChartColors.lightGray};

  h4 {
    margin: 0 0 ${ThemeConstants.spacing.absolute.s}px 0;
  }
`;

export default {
  title: 'Charts/Scatter',
  control: ChartWrapper,
};

const renderTooltip = (props) => {
  const { active, payload } = props;

  if (active && payload?.length) {
    const item = payload[0]?.payload;

    return (
      <ToolTipContainer>
        <h4>{item.hour}</h4>
        <div>{item.value} alerts</div>
      </ToolTipContainer>
    );
  }

  return null;
};

export const BubbleChart = () => {
  const domain = extent(data, (d) => d.value);
  const range = [0, 300];

  const getCellColor = ({ value }): string => {
    if (value === null) {
      return ThemeColors.white;
    }

    if (value <= 100) {
      return ThemeColors.orange_50;
    }

    if (value > 100 && value < 150) {
      return ThemeColors.orange_70;
    }

    if (value >= 150) {
      return ThemeColors.red_50;
    }

    return ThemeColors.gray_20;
  };

  return (
    <ChartWrapper>
      <h3>Alerts by hour</h3>
      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            dataKey="hour"
            name="hour"
            interval={0}
            tickLine={{
              transform: 'translate(0, -6)',
              stroke: CPChartColors.gray,
            }}
            tick={{ fontSize: '14px', fill: CPChartColors.darkGray }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="today"
            height={20}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Today', position: 'insideRight' }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data}>
            {data.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={`cell-${index}`} fill={getCellColor(entry)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
