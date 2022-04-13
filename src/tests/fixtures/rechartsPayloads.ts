/* eslint-disable camelcase */
import { CPChartColors } from '../../common/theme';

const samplePayload = {
  dataKey: 'hello',
  name: 'Hello',
  stroke: CPChartColors.gray,
  fill: CPChartColors.gray,
  shape: 'bar',
  value: 1234,
  timestamp: new Date().getTime(),
};

export const multipleSeriesPayload_1 = [
  {
    dataKey: 'hello',
    name: 'Hello',
    fill: CPChartColors.gray,
    stroke: CPChartColors.gray,
    shape: 'bar',
    value: 1234,
    payload: samplePayload,
  },
  {
    dataKey: 'world',
    name: 'World',
    fill: CPChartColors.blue,
    stroke: CPChartColors.blue,
    shape: 'bar',
    value: 1235,
    payload: samplePayload,
  },
];

export const mutipleSeriesPayload_2 = [
  {
    dataKey: 'hello',
    name: 'Hello',
    stroke: CPChartColors.gray,
    fill: CPChartColors.gray,
    shape: 'bar',
    value: 10,
  },

  {
    dataKey: 'world',
    name: 'World',
    stroke: CPChartColors.gray,
    fill: CPChartColors.gray,
    shape: 'line',
    value: 10,
  },
];
