import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";
import { format } from "date-fns";
import { CPChartColors } from "../common/theme";
import { ISO_DATE_TIME, ISO_TIME } from "../common/constants";
import { Info, Item, List, ListItem, StoryWrapper } from "../components/Styled";

const mockData = [
  {
    timestamp: new Date("2022-02-01 00:00").getTime(),
    traffic: 2,
  },
  {
    timestamp: new Date("2022-02-01 01:00").getTime(),
    traffic: 1,
  },
  {
    timestamp: new Date("2022-02-01 02:00").getTime(),
    traffic: 1,
  },
  {
    timestamp: new Date("2022-02-01 03:00").getTime(),
    traffic: 0.5,
  },
  {
    timestamp: new Date("2022-02-01 04:00").getTime(),
    traffic: 0.5,
  },
  {
    timestamp: new Date("2022-02-01 05:00").getTime(),
    traffic: 1,
  },
  {
    timestamp: new Date("2022-02-01 06:00").getTime(),
    traffic: 3,
  },
  {
    timestamp: new Date("2022-02-01 07:00").getTime(),
    traffic: 4,
  },
  {
    timestamp: new Date("2022-02-01 08:00").getTime(),
    traffic: 7,
  },
  {
    timestamp: new Date("2022-02-01 09:00").getTime(),
    traffic: 6,
  },
  {
    timestamp: new Date("2022-02-01 10:00").getTime(),
    traffic: 8,
  },
  {
    timestamp: new Date("2022-02-01 11:00").getTime(),
    traffic: 5,
  },
  {
    timestamp: new Date("2022-02-01 12:00").getTime(),
    traffic: 8,
  },
  {
    timestamp: new Date("2022-02-01 13:00").getTime(),
    traffic: 6,
  },
  {
    timestamp: new Date("2022-02-01 14:00").getTime(),
    traffic: 5,
  },
  {
    timestamp: new Date("2022-02-01 15:00").getTime(),
    traffic: 4,
    now: true,
  },
  {
    timestamp: new Date("2022-02-01 16:00").getTime(),
    traffic: 3,
  },
  {
    timestamp: new Date("2022-02-01 17:00").getTime(),
    traffic: 4,
  },
  {
    timestamp: new Date("2022-02-01 18:00").getTime(),
    traffic: 5,
  },
  {
    timestamp: new Date("2022-02-01 19:00").getTime(),
    traffic: 4,
  },
  {
    timestamp: new Date("2022-02-01 20:00").getTime(),
    traffic: 3,
  },
  {
    timestamp: new Date("2022-02-01 21:00").getTime(),
    traffic: 2,
  },
  {
    timestamp: new Date("2022-02-01 22:00").getTime(),
    traffic: 3,
  },
  {
    timestamp: new Date("2022-02-01 23:00").getTime(),
    traffic: 2,
  },
];

export default {
  title: "Charts/Bar",
  component: BarChart,
};

export const Basic = () => {
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
          labelFormatter={(value, payload) => {
            return format(new Date(value), "h b");
          }}
        />
        <XAxis
          height={48}
          tickMargin={8}
          tickCount={24}
          interval={0}
          fontSize={"12px"}
          dataKey="timestamp"
          tickFormatter={(unixTime) => format(new Date(unixTime), "h")}
        />
        <YAxis fontSize={"12px"} />
        <Bar dataKey={"traffic"}>
          {mockData.map((entry, index) => (
            <Cell
              fill={entry.now ? CPChartColors.pink : CPChartColors.lightGray}
            />
          ))}
        </Bar>
      </BarChart>
    </StoryWrapper>
  );
};
