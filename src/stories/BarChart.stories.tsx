import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from 'recharts';
import { format } from 'date-fns';
import { CPChartColors } from '../common/theme';
import { List, ListItem, StoryWrapper } from '../components/Styled';

import mockData from '../tests/fixtures/data/traffic.json';

export default {
  title: 'Charts/Bar',
  component: BarChart,
};

export function Basic() {
  return (
    <StoryWrapper>
      <h1>Bar Chart</h1>
      <List type="dot">
        <ListItem>Simple Bar Chart with specific bar highlighted</ListItem>
        <ListItem>Shows simple label axis label formatting</ListItem>
      </List>

      <BarChart data={mockData} width={700} height={200}>
        <Tooltip
          cursor={false}
          labelFormatter={(value) => {
            return format(new Date(value), 'h b');
          }}
        />
        <XAxis
          height={48}
          tickMargin={8}
          tickCount={24}
          interval={0}
          fontSize="12px"
          dataKey="timestamp"
          tickFormatter={(unixTime) => format(new Date(unixTime), 'h')}
        />
        <YAxis fontSize="12px" />
        <Bar dataKey="traffic">
          {mockData.map((entry) => (
            <Cell
              fill={entry.now ? CPChartColors.pink : CPChartColors.lightGray}
            />
          ))}
        </Bar>
      </BarChart>
    </StoryWrapper>
  );
}
