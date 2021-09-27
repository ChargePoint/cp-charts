import KitCharts, { ChartSeries } from '../components/KitCharts';
import styled from 'styled-components';
import { createDataPoints } from '../common/constants';

const Chart = styled(KitCharts)`
  width: 700px;
  height: 400px;
  border: 1px solid gray;
`;

export default {
  component: KitCharts,
  title: 'KitCharts',
};

const Template = (args) => <Chart {...args} />;

export const BarChart50DataPoints = Template.bind({});
BarChart50DataPoints.args = {
  id: 'storybook-bar-chart-1',
  data: createDataPoints(50),
  showScrollbar: true,
  dateAxisTitle: 'Time',
  yAxisTitle: 'Energy kWh',
  tooltipText: '[bold]{valueY}[/] kWh',
  chartSeries: ChartSeries.Column
};

export const BarChart250DataPoints = Template.bind({});
BarChart250DataPoints.args = {
  id: 'storybook-bar-chart-1',
  data: createDataPoints(250),
  showScrollbar: false,
  chartSeries: ChartSeries.Column
};

export const AreaChart50DataPoints = Template.bind({});
AreaChart50DataPoints.args = {
  id: 'storybook-bar-chart-1',
  data: createDataPoints(50),
  showScrollbar: true,
  dateAxisTitle: 'Time',
  yAxisTitle: 'Energy kWh',
  tooltipText: '[bold]{valueY}[/] kWh',
  chartSeries: ChartSeries.Line
};

export const AreaChart250DataPoints = Template.bind({});
AreaChart250DataPoints.args = {
  id: 'storybook-bar-chart-1',
  data: createDataPoints(250),
  showScrollbar: false,
  chartSeries: ChartSeries.Line
};
