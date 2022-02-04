import { format } from "date-fns";

import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Area,
} from "recharts";

import { TimeSeriesData } from "../types";

import styled from "styled-components";
import { extent } from "d3-array";
import { ISO_DATE_TIME } from "../common/constants";
import CPChartTooltip from "../components/CPChartToolTip";
import { StoryWrapper } from "../components/Styled";

const mockData = [
  {
    time: "2022-01-05 12:15:00.000000000",
    power: 1,
    soc: 0,
  },
  {
    time: "2022-01-05 12:30:00.000000000",
    power: 1.3,
    soc: 1,
  },
  {
    time: "2022-01-05 12:45:00.000000000",
    power: 1.2,
    soc: 1.5,
  },
  {
    time: "2022-01-05 13:00:00.000000000",
    power: 1.1,
    soc: 2,
  },
  {
    time: "2022-01-05 13:15:00",
    power: 1.3,
    soc: 2.3,
  },
  {
    time: "2022-01-05 13:30:00",
    power: 1.2,
    soc: 3.4,
  },
  {
    time: "2022-01-05 13:45:00",
    power: 1.1,
    soc: 4.1,
  },
  {
    time: "2022-01-05 14:00:00",
    power: 1.2,
    soc: 4.5,
  },
  {
    time: "2022-01-05 14:15:00",
    power: 1.1,
    soc: 5.2,
  },
  {
    time: "2022-01-05 14:30:00",
    power: 0.2,
    soc: 5.2,
  },
];

const ChartWrapper = styled.div`
  padding: ;
`;

function prepareData(response: Record<string, unknown | string>[]) {
  return response.map((d) => ({
    ...d,
    timestamp: new Date(d.time as string).getTime(),
  }));
}

export default {
  title: "Charts/Composed",
  control: ChartWrapper,
};

function getCustomToolTip(props) {
  return (
    <CPChartTooltip
      formatTimeStamp={(row) => format(row.timestamp, ISO_DATE_TIME)}
      formatter={(key: string, value: number) => {
        if (key === "soc") {
          return `${value}%`;
        }
      }}
      {...props}
    />
  );
}

export const ComposedLineAndAreaChart = ({ interpolationType }) => {
  const data = prepareData(mockData.concat());
  const xDomain = extent(data, (d: TimeSeriesData) => d.timestamp);

  return (
    <StoryWrapper>
      <h1>Composed Line and Area chart</h1>
      <ComposedChart data={data} height={300} width={500}>
        <CartesianGrid />
        <Tooltip />
        <Legend />
        <YAxis unit=" kW" />
        <XAxis
          domain={xDomain}
          dataKey="timestamp"
          name="Time"
          type="number"
          scale="time"
          tickFormatter={(unixTime) => format(unixTime, "HH:mm")}
        />
        <Line dataKey="soc" name="SOC" stroke="gray" />
        <Area dataKey="power" name="Power" stroke="green" fill="green" />
      </ComposedChart>
    </StoryWrapper>
  );
};

export const WithCustomToolTip = ({ interpolationType }) => {
  const data = prepareData(mockData.concat());
  const xDomain = extent(data, (d: TimeSeriesData) => d.timestamp);

  return (
    <StoryWrapper>
      <h1>Composed Line and Area chart w/ custom ToolTip</h1>
      <ComposedChart data={data} height={300} width={500}>
        <CartesianGrid />
        <Tooltip content={getCustomToolTip} />
        <Legend />
        <YAxis unit=" kW" />
        <XAxis
          domain={xDomain}
          dataKey="timestamp"
          name="Time"
          type="number"
          scale="time"
          tickFormatter={(unixTime) => format(unixTime, "HH:mm")}
        />
        <Line dataKey="soc" name="SOC" stroke="gray" />
        <Area dataKey="power" name="Power" stroke="green" fill="green" />
      </ComposedChart>
    </StoryWrapper>
  );
};
