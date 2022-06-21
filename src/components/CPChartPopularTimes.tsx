import { FC, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  KitConstants,
  KitUtilCommon,
  ThemeColors,
  ThemeColors as colors,
  ThemeSchema,
  ThemeConstants
} from '@chargepoint/cp-toolkit';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, ReferenceLine } from 'recharts';
import { hasValue } from '../common/utils';
const { isKey } = KitUtilCommon;
import { CPChartColors } from '../common/theme';

const { KeyConstants } = KitConstants;

const ChartWrapper = styled.div`
  max-width: 400px;
  margin: auto;
  border-top: 1px dashed ${colors.gray_20};
`;

const Text = styled.text<{ index: number }>`
  text-anchor: ${(props) => (props.index > 12 ? 'end' : 'start')};
  [dir='rtl'] && {
    text-anchor: ${(props) => (props.index < 12 ? 'end' : 'start')};
  }
`;

interface BarProps {
  x: number;
  hour?: number;
  label?: string | string[];
}

export interface StationOccupancyPerHour {
  hour: number;
  occupancy: number;
}

export interface PopularTimesChartProps {
  occupancyForCurrentDay: StationOccupancyPerHour[];
}

interface CustomLabelProps {
  viewBox: any;
}

function getSelectedBarProps(val: {
  x: number;
  hour?: number;
  label: string[];
}): BarProps {
  if (!val) {
    return {
      x: 0,
    };
  }
  return {
    x: val.x,
    label: val.label,
    hour: val.hour || 0,
  };
}

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  width: 100%;
  svg * {
    font-size: ${ThemeConstants.fontSize.text_14}rem;
  }
`;

const PopularTimesChart: FC<PopularTimesChartProps> = ({ occupancyForCurrentDay }) => {
  console.info(occupancyForCurrentDay, 'occupancyForCurrentDay2');
  const { t, i18n } = useTranslation();
  const theme = useTheme() as ThemeSchema;
  const [activeBarIndex, setActiveBarIndex] = useState<number>(1);
  const [selectedBarProps, setSelectedBarProps] = useState<BarProps>({
    x: 0,
    label: [],
    hour: 0,
  });
  const [keyPressed, setKeyPressed] = useState(false);
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [data, setData] = useState<StationOccupancyPerHour[]>([]);

  const getCustomLabel = (
    props: CustomLabelProps,
    { label, index }: { label: string[]; index: number }
  ) => {
    const { viewBox } = props;
    const offset = index > 12 ? index * 0.1 + 2 : index * 0.1 - 5;
    const x = typeof viewBox?.x === 'number' ? Math.round(viewBox?.x) : 0;
    const computedX = x - offset;
    return (
      <g>
        {label.map((txt, i) => (
          <Text
            aria-live={!keyPressed ? 'polite' : undefined}
            x={computedX}
            y={15 + i * 16}
            fill={ThemeColors.gray_50}
            index={index}
          >
            {txt}
          </Text>
        ))}
      </g>
    );
  };

  const hourWithHighestOccupancy = occupancyForCurrentDay.reduce((max, current) => {
    return max.occupancy > current.occupancy ? max : current;
  });

  const getBarColor = (isActive: boolean, isNow: boolean) => {
    if (isActive && isNow) {
      return CPChartColors.pink;
    }
    return isActive ? CPChartColors.lightBlue : CPChartColors.lightGray;
  };

  const formatXAxisHours = (hours: number) => {
    const date = new Date(0, 0, 0, hours, 0, 0);
    return date.toLocaleTimeString(i18n.language, {
      hour: 'numeric',
    });
  };

  const valueFormatter = (value: number) => {
    const percentage = new Intl.NumberFormat(i18n.language, {
      style: 'percent',
      maximumFractionDigits: 2,
    });
    return [percentage.format(value / 100), t('occupancy')];
  };

  const getBarLabel = (val: StationOccupancyPerHour) => {
    return [
      formatXAxisHours(val.hour),
      `${valueFormatter(val.occupancy)[1]}: ${valueFormatter(val.occupancy)[0]}`,
    ];
  };

  const handleKeyUp = () => {
    setKeyPressed(false);
  };

  const handleKeyDown = (e: unknown) => {
    setKeyPressed(true);
    if (!activeBarIndex === undefined) {
      return;
    }
    if (isKey([KeyConstants.LEFT], e as KeyboardEvent)) {
      const idx = hasValue(activeBarIndex) ? activeBarIndex - 1 : 0;
      if (idx >= 0) {
        const val = data[idx];
        setActiveBarIndex(idx);
        setSelectedBarProps(
          getSelectedBarProps({
            x: idx,
            label: getBarLabel(val),
            hour: val.hour,
          })
        );
      }
    }
    if (isKey([KeyConstants.RIGHT], e as KeyboardEvent)) {
      const idx = hasValue(activeBarIndex) ? activeBarIndex + 1 : 0;
      if (idx < data.length) {
        const val = data[idx];
        setActiveBarIndex(idx);
        setSelectedBarProps(
          getSelectedBarProps({
            x: idx,
            label: getBarLabel(val),
            hour: val.hour,
          })
        );
      }
    }
  };

  const handleBarClick = ({ hour }: BarProps) => {
    const idx = data.findIndex((d) => d.hour === hour);
    const val = data[idx];
    setActiveBarIndex(idx);
    setSelectedBarProps(
      getSelectedBarProps({
        x: idx,
        label: getBarLabel(val),
        hour: val.hour,
      })
    );
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    setCurrentHour(currentHour);
    const idx = occupancyForCurrentDay.findIndex((d) => d.hour === currentHour);
    const index = idx >= 0 ? idx : 0;
    setActiveBarIndex(index);
    setSelectedBarProps(
      getSelectedBarProps({
        x: index,
        label: getBarLabel(occupancyForCurrentDay[index]),
        hour: occupancyForCurrentDay[index].hour,
      })
    );
    setData(occupancyForCurrentDay);
  }, [occupancyForCurrentDay]);

  return (
    <ChartWrapper tabIndex={0} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <StyledResponsiveContainer height={150}>
        <BarChart data={occupancyForCurrentDay} margin={{ top: 35, left: 5, right: 5 }}>
          {hasValue(activeBarIndex) && (
            <ReferenceLine
              ifOverflow='extendDomain'
              orientation='vertical'
              x={occupancyForCurrentDay[activeBarIndex]?.hour || 0}
              label={(props) =>
                getCustomLabel(props, {
                  label: selectedBarProps.label as string[],
                  index: selectedBarProps.hour || 0,
                })
              }
              stroke={ThemeColors.gray_20}
            />
          )}
          <XAxis
            padding={{ left: 15, right: 15 }}
            dataKey='hour'
            type='number'
            domain={['dataMin', 'dataMax']}
            tickFormatter={formatXAxisHours}
          />
          <Tooltip
            labelFormatter={formatXAxisHours}
            formatter={valueFormatter}
            contentStyle={{
              background: theme.card.body.bg,
            }}
            itemStyle={{
              color: theme.card.body.text,
            }}
          />
          <Bar dataKey='occupancy' onClick={handleBarClick}>
            {occupancyForCurrentDay.map((entry, idx) => (
              <Cell
                aria-selected={idx === activeBarIndex}
                key={`cell-${entry.hour}`}
                fill={getBarColor(idx === activeBarIndex, currentHour === entry.hour)}
              />
            ))}
          </Bar>
        </BarChart>
      </StyledResponsiveContainer>
    </ChartWrapper>
  );
};

export default PopularTimesChart;
