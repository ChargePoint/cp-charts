import { StoryWrapper } from '../../components/Styled';
import { CPChartPopularTimes } from '../../index';

export function KeyboardNavigablePopularTimesChart() {
  const popularTimes = [
    {
      "hour":1,
      "occupancy":9.62
    },
    {
      "hour":4,
      "occupancy":9.62
    },
    {
      "hour":5,
      "occupancy":1.92
    },
    {
      "hour":7,
      "occupancy":3.85
    },
    {
      "hour":10,
      "occupancy":7.69
    },
    {
      "hour":11,
      "occupancy":1.92
    },
    {
      "hour":13,
      "occupancy":1.92
    },
    {
      "hour":14,
      "occupancy":1.92
    },
    {
      "hour":16,
      "occupancy":1.92
    },
    {
      "hour":19,
      "occupancy":3.85
    },
    {
      "hour":20,
      "occupancy":1.92
    }
  ];
  return (
    <StoryWrapper>
      <h1>Keyboard Navigable Popular Times Chart</h1>
      <CPChartPopularTimes occupancyForCurrentDay={popularTimes} />
    </StoryWrapper>
  );
}

export default {
  title: 'Charts/A11Y',
  component: CPChartPopularTimes,
};
