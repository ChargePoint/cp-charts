import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import { CPChartColors } from '../common/theme';
import { ChartWrapper, TooltipContainer } from '../components/CPChartElements';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

export default {
  title: 'Charts/Pie',
};

const renderTooltip = (props) => {
  const { active, payload } = props;

  if (active && payload?.length) {
    const item = payload[0]?.payload;

    return (
      <TooltipContainer>
        <div>
          <div>{item.name}</div>
          <b className='value'>${item.value}</b>
        </div>
      </TooltipContainer>
    );
  }

  return null;
};

export const PieChartWithLabels = () => {
  const names = data.map((d) => d.name);
  const scale = scaleOrdinal(schemeCategory10);
  const domain = scale.domain(names);

  return (
    <ChartWrapper width={400}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Tooltip content={renderTooltip} />
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            nameKey='name'
            label={(entry) => entry.name}
            labelLine
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={`cell-${index}`} fill={domain(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export const PieChartWithLegend = () => {
  const names = data.map((d) => d.name);
  const scale = scaleOrdinal(Object.values(CPChartColors).reverse());
  const domain = scale.domain(names);

  return (
    <ChartWrapper width={400}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Legend align='right' layout='vertical' verticalAlign='middle' />
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            nameKey='name'
            label={(entry) => entry.value}
            labelLine
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={`cell-${index}`} fill={domain(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export const Donut = () => {
  const names = data.map((d) => d.name);
  const scale = scaleOrdinal(Object.values(CPChartColors).reverse());
  const domain = scale.domain(names);

  return (
    <ChartWrapper width={400}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Tooltip content={renderTooltip} />
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            nameKey='name'
            innerRadius={50}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Cell key={`cell-${index}`} fill={domain(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
