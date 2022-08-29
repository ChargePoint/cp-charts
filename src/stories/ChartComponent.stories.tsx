import { BarChart, Bar, Tooltip } from 'recharts';
import { format } from 'date-fns';
import { ThemeColors, ThemeConstants } from '@chargepoint/cp-toolkit';
import styled from 'styled-components';

import { CPChartColors } from '../common/theme';
import { ISO_DATE_TIME } from '../common/constants';
import {
  List,
  ListItem,
  Spacer,
  StoryWrapper,
  Table,
} from '../components/Styled';
import CPChartTooltip from '../components/CPChartTooltip';
import CPChartZoomOutButton from '../components/CPChartZoomOutButton';
import PulsingCircle from '../components/PulsingCircle';

import mockData from '../tests/fixtures/data/traffic.json';
// eslint-disable-next-line camelcase
import { multipleSeriesPayload_1 } from '../tests/fixtures/rechartsPayloads';

const { spacing } = ThemeConstants;

export default {
  title: 'Charts/Components',
  component: CPChartTooltip,
};

const Content = styled.div`
  table {
    border-left: 1px solid ${ThemeColors.gray_10};
    border-top: 1px solid ${ThemeColors.gray_10};
    td,
    th {
      border-bottom: 1px solid ${ThemeColors.gray_10};
      border-right: 1px solid ${ThemeColors.gray_10};
      min-width: 150px;
      text-align: center;
      padding: ${spacing.absolute.m}px;
    }
  }

  .tooltip-standalone-example {
    max-width: 150px;
  }

  .light {
    background: ${ThemeColors.white};
  }

  .dark {
    color: ${ThemeColors.white};
    background: ${ThemeColors.gray_70}EE;
    border: 1px solid ${ThemeColors.gray_90}EE;
  }
`;

export const CustomToolTip = () => {
  const formatTimeStamp = (row) =>
    format(new Date(row.timestamp), ISO_DATE_TIME);

  return (
    <StoryWrapper>
      <h1>CPChartToolTip</h1>
      <List type="dot">
        <ListItem>Simple tooltip built for ReCharts. </ListItem>
        <ListItem>
          Works with zero configuration, or allows you to customize the items
          with formatters
        </ListItem>
      </List>

      <Content>
        <CPChartTooltip
          className="tooltip-standalone-example"
          payload={multipleSeriesPayload_1}
          formatTimeStamp={formatTimeStamp}
        />
        <Spacer size={spacing.absolute.l} orientation="vertical" />
        <BarChart data={mockData} width={400} height={120}>
          <Bar
            dataKey="traffic"
            name="Traffic"
            fill={CPChartColors.darkOrange}
          />
          <Tooltip
            cursor={{
              fillOpacity: 0.2,
            }}
            content={
              <CPChartTooltip
                mode="mergeItemsWithPayload"
                items={[{ key: 'foo', label: 'Foo', unit: 'kW' }]}
                formatTimeStamp={formatTimeStamp}
              />
            }
          />
        </BarChart>
      </Content>
    </StoryWrapper>
  );
};

CustomToolTip.args = {
  theme: 'light',
};

export const Other = () => {
  return (
    <Content>
      <Table>
        <tr>
          <th>Buttons</th>
          <th>Other</th>
        </tr>
        <tr>
          <td>
            <CPChartZoomOutButton />
          </td>
          <td>
            <svg viewBox="0 0 25 25" height="25" width="25">
              <g>
                <PulsingCircle
                  x={12}
                  y={12}
                  radius={8}
                  fill={CPChartColors.blue}
                />
              </g>
            </svg>
          </td>
        </tr>
      </Table>
    </Content>
  );
};
