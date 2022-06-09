import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, Cell, ReferenceLine } from 'recharts';
import { format } from 'date-fns';
import {
  KitUtilCommon,
  KitConstants,
  ThemeColors,
  ThemeConstants,
} from '@chargepoint/cp-toolkit';
import styled from 'styled-components';
import { CartesianViewBox } from 'recharts/types/util/types';
import { CPChartColors } from '../../common/theme';
import { hasValue } from '../../common/utils';
import { StoryWrapper } from '../../components/Styled';
import PulsingSVGCircle from '../../components/PulsingCircle';

import mockData from '../../tests/fixtures/data/traffic.json';

const { KeyConstants } = KitConstants;
const { isKey } = KitUtilCommon;

interface BarProps {
  x: number;
  now?: number;
  label: string | string[];
}

const ChartsWrapper = styled.div`
  padding: ${ThemeConstants.spacing.absolute.l}px;
  &:focus {
    outline: 2px solid ${ThemeColors.blue_30};
  }
  width: fit-content;
`;

export default {
  title: 'Charts/A11Y',
  component: BarChart,
};

function getBusyLabel(traffic) {
  if (traffic <= 2) {
    return 'usually not busy';
  }

  if (traffic > 2 && traffic < 5) {
    return 'usually a bit busy';
  }

  if (traffic >= 5 && traffic < 8) {
    return 'usually very busy';
  }

  if (traffic >= 8) {
    return 'usually crowded';
  }
  return 'unknown';
}

function getCustomLabel(
  props,
  {
    label,
    now,
    index,
  }: { label: string[]; now?: boolean | number; index: number }
) {
  const { viewBox } = props;
  const offset = index * 4.5;
  const x = Math.round((viewBox as CartesianViewBox)?.x);
  const computedX = x - offset;
  const circleX = computedX - 15;
  return (
    <g>
      {now && (
        <PulsingSVGCircle
          x={circleX}
          y={10}
          radius={6}
          fill={CPChartColors.pink}
        />
      )}
      {label.map((txt, i) => (
        <text
          aria-live="polite"
          x={computedX}
          y={10 + i * 16}
          fill={ThemeColors.gray_50}
          fontSize={14}
        >
          {txt}
        </text>
      ))}
    </g>
  );
}

function getSelectedBarProps(val): BarProps {
  return {
    x: val.timestamp,
    now: val.now,
    label: [
      val.now ? 'Now' : `${format(val.timestamp, 'h aaa')}`,
      getBusyLabel(val.traffic),
    ],
  };
}

function getBarFill(isActive: boolean, isNow: boolean) {
  if (isActive && isNow) {
    return CPChartColors.pink;
  }
  return isActive ? CPChartColors.lightBlue : CPChartColors.lightGray;
}

function getBarStroke(isActive: boolean, isNow: boolean) {
  if (isActive && isNow) {
    return CPChartColors.pink;
  }
  return isActive ? CPChartColors.lightBlue : CPChartColors.lightGray;
}

export function KeyboardNavigableBarChart() {
  const [data] = useState(mockData);
  const [activeBarIndex, setActiveBarIndex] = useState<number>();
  const [selectedBarProps, setSelectedBarProps] = useState<BarProps>();

  const handleBarClick = ({ timestamp }) => {
    const idx = data.findIndex((d) => d.timestamp === timestamp);
    const val = data[idx];
    setActiveBarIndex(idx);
    setSelectedBarProps(getSelectedBarProps(val));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isKey([KeyConstants.LEFT], e)) {
      const idx = hasValue(activeBarIndex) ? activeBarIndex - 1 : 0;
      if (idx >= 0) {
        const val = data[idx];
        setActiveBarIndex(idx);
        setSelectedBarProps(getSelectedBarProps(val));
      }
    }

    if (isKey([KeyConstants.RIGHT], e)) {
      const idx = hasValue(activeBarIndex) ? activeBarIndex + 1 : 0;
      if (idx < data.length) {
        const val = data[idx];
        setActiveBarIndex(idx);
        setSelectedBarProps(getSelectedBarProps(val));
      }
    }
  };

  useEffect(() => {
    const idx = data.findIndex((d) => d.now);
    const val = data[idx];
    setActiveBarIndex(idx);
    setSelectedBarProps(getSelectedBarProps(val));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoryWrapper>
      <h1>Keyboard Navigable BarChart</h1>
      <ChartsWrapper
        tabIndex={0}
        className="cp-charts-wrapper"
        onKeyDown={handleKeyDown}
      >
        <div className="sr-only">Chart showing popular station times</div>
        <BarChart
          data={data}
          width={700}
          height={250}
          margin={{ top: 35, left: 25, right: 25 }}
        >
          {hasValue(activeBarIndex) && (
            <ReferenceLine
              ifOverflow="extendDomain"
              orientation="vertical"
              x={selectedBarProps.x}
              label={(props) =>
                getCustomLabel(props, {
                  label: selectedBarProps.label as string[],
                  index: activeBarIndex,
                  now: selectedBarProps.now,
                })
              }
              stroke={ThemeColors.gray_20}
            />
          )}
          <XAxis
            height={48}
            tickMargin={8}
            tickCount={24}
            interval={0}
            fontSize="12px"
            dataKey="timestamp"
            tickFormatter={(unixTime) => format(new Date(unixTime), 'h')}
          />
          <Bar dataKey="traffic" onClick={handleBarClick}>
            {data.map((entry, idx) => (
              <Cell
                aria-selected={idx === activeBarIndex}
                aria-label={`Some label that makes sense ${entry}`}
                strokeWidth={idx === activeBarIndex ? 2 : null}
                stroke={getBarStroke(idx === activeBarIndex, entry.now)}
                fill={getBarFill(idx === activeBarIndex, entry.now)}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartsWrapper>
    </StoryWrapper>
  );
}
