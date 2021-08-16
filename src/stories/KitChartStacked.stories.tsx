import React from 'react';
import KitChartStacked from '../components/KitCharts/KitChartsStacked';
import styled from 'styled-components';
import { ChartSeries } from "../components/KitCharts";

const Chart = styled(KitChartStacked)`
  width: 700px;
  height: 400px;
  border: 1px solid gray;
`;

const dataPointKeyNames = [
  'vehicle1',
  'vehicle2',
  'vehicle3'
];

const createDataPoints = (numDataPoints) => {
  const data = [];

  // current date
  const firstDate = new Date();

  // now set numDataPoints minutes back
  firstDate.setMinutes(firstDate.getDate() - numDataPoints);

  // and generate data items
  let vehicle1 = numDataPoints;
  let vehicle2 = numDataPoints;
  let vehicle3 = numDataPoints;

  for (let i = 0; i < numDataPoints; i++) {
      let newDate = new Date(firstDate);
      // each time we add one minute
      newDate.setMinutes(newDate.getMinutes() + i);
      // some random number
      vehicle1 += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
      vehicle2 += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
      vehicle3 += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
      // add data item to the array
      data.push({
          date: newDate,
          vehicle1: Math.max(0, vehicle1),
          vehicle2: Math.max(0, vehicle2),
          vehicle3: Math.max(0, vehicle3)
      });
  }

  return data;
}

export default {
  component: KitChartStacked,
  title: 'KitChartStacked',
};

const Template = (args) => <Chart {...args} />;

export const KitAreaChartStacked = Template.bind({});
KitAreaChartStacked.args = {
  id: 'stacked_chart_1',
  data: createDataPoints(50),
  dataPointKeyNames: dataPointKeyNames,
  yAxisTitle: 'Energy kWh',
  chartSeries: ChartSeries.Line
};

export const KitBarChartStacked = Template.bind({});
KitBarChartStacked.args = {
  id: 'stacked_chart_2',
  data: createDataPoints(50),
  dataPointKeyNames: dataPointKeyNames,
  yAxisTitle: 'Energy kWh',
  chartSeries: ChartSeries.Column
};
