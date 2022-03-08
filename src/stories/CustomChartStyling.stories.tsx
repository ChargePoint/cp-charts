import { useState } from 'react';
import { format } from 'date-fns';
import {
  XAxis,
  YAxis,
  ReferenceArea,
  CartesianGrid,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { ThemeColors, ThemeConstants } from '@chargepoint/cp-toolkit';
import { ChartZoom } from '../common/utils';
import { CPChartColors } from '../common/theme';
import { StoryWrapper } from '../components/Styled';
import ZoomButton from '../components/ZoomOutButton';
import { ChartEvent, InterpolationType, Rect } from '../types';
import { createDataPoints } from '../tests/testHelpers';
import {
  DEFAULT_ZOOM,
  DEFAULT_HIGHLIGHT_ZOOM,
  MIN_ZOOM,
} from '../common/constants';

const { fontSize, spacing } = ThemeConstants;

const mockData = createDataPoints(30);

function CustomTooltip({ active, payload, label }) {
  if (active) {
    const { value } = payload[0];
    return (
      <div className="tooltip">
        <h4>{format(label, 'MMM dd, yy')}</h4>
        <span>${value} USD</span>
      </div>
    );
  }

  return null;
}

const ChartContainer = styled.div`
  width: 100%;
  user-select: none;
  position: relative;
  .zoom-button {
    position: absolute;
    right: 0px;
    top: ${-spacing.absolute.xl}px;
    padding: ${spacing.absolute.xs}px 0;
    line-height: ${spacing.absolute.xl}px;
    height: ${spacing.absolute.xl}px;
    min-width: ${spacing.absolute.xl}px;
  }
  .tooltip {
    border-radius: ${spacing.absolute.s}px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    background: ${ThemeColors.white}AA;
    opacity: 0.5;
    padding: ${spacing.absolute.s}px;
    text-align: center;
    transform: translate(-50%, -50%);
    h4 {
      margin: 0;
    }
    p {
      padding: 0 ${spacing.absolute.s}px;
    }
  }
`;

const axisStyle = {
  fontSize: `${fontSize.text_14}rem`,
};

export function AreaChartWithCustomStyling() {
  const [data, setData] = useState(mockData);
  const [isZooming, setIsZooming] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  // data bounds a.k.a 'domain' -- used for zooming in o data using domain attribute in recharts
  const [bounds, setBounds] = useState<Rect>(DEFAULT_ZOOM);
  const [highLight, setHighLight] = useState<Rect>(DEFAULT_HIGHLIGHT_ZOOM);
  const xDataKey = 'date';

  function handleMouseDown(e: ChartEvent) {
    setHighLight(ChartZoom.init(e, highLight, xDataKey));
    setIsZooming(true);
  }

  function handleMouseMove(e: ChartEvent) {
    const x2 = ChartZoom.getEventPayloadValue(e, xDataKey);
    if (isZooming) {
      setHighLight((prev) => ({ ...prev, x2 }));
    }
  }

  function handleMouseUp() {
    if (isZooming) {
      const { zoomed, zoomBounds } = ChartZoom.getBounds(
        highLight,
        data,
        xDataKey,
        'value',
        MIN_ZOOM
      );

      if (zoomed) {
        setIsZoomedIn(true);
        setData(data.slice());
        setHighLight(DEFAULT_HIGHLIGHT_ZOOM);
        setBounds(zoomBounds as Rect);
      }

      setIsZooming(false);
    }
  }

  function zoomOut() {
    setIsZoomedIn(false);
    setBounds(DEFAULT_ZOOM);
    setData(() => data.slice());
  }

  return (
    <StoryWrapper>
      <ChartContainer>
        {isZoomedIn && (
          <ZoomButton
            className="zoom-button"
            onClick={zoomOut}
            ariaLabel="zoom out"
          />
        )}
        <ResponsiveContainer minHeight={350} width="100%">
          <AreaChart
            data={data}
            width={800}
            height={300}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={CPChartColors.blue}
                  stopOpacity={0.45}
                />
                <stop
                  offset="75%"
                  stopColor={CPChartColors.blue}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} opacity={0.4} />
            <XAxis
              allowDataOverflow
              axisLine={false}
              dataKey="date"
              domain={[bounds.x1, bounds.x2]}
              style={axisStyle}
              tickFormatter={(unixTime) => format(new Date(unixTime), 'HH:mm')}
              tick={{ fill: CPChartColors.gray }}
              tickCount={6}
              type="number"
            />
            <YAxis
              allowDataOverflow
              domain={[bounds.y2, bounds.y1]}
              type="number"
              tickLine={false}
              tick={{ fill: CPChartColors.gray }}
              tickFormatter={(val) => `$${val}`}
              axisLine={false}
              style={axisStyle}
            />
            <Area
              animationDuration={600}
              animationEasing="ease-out"
              type={InterpolationType.basis}
              dataKey="value"
              fill="url(#gradient)"
              stroke={CPChartColors.blue}
              strokeWidth={2}
            />
            <Tooltip
              allowEscapeViewBox={{ x: true }}
              offset={0}
              position={{ y: 50 }}
              content={CustomTooltip}
              isAnimationActive={false}
            />
            {isZooming ? (
              <ReferenceArea
                x1={highLight.x1}
                x2={highLight.x2}
                strokeOpacity={0.3}
              />
            ) : null}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </StoryWrapper>
  );
}

export default {
  title: 'Charts/Area',
  component: AreaChart,
};
