import { useState } from 'react';
import { format } from 'date-fns';
import {
  XAxis,
  YAxis,
  ReferenceArea,
  CartesianGrid,
  Line,
  Area,
  Tooltip,
  ComposedChart,
} from 'recharts';
import styled from 'styled-components';
import { ThemeConstants } from '@chargepoint/cp-toolkit';
import { ChartZoom, getEventPayloadValue } from '../common/utils';
import { CPChartColors } from '../common/theme';
import { StoryWrapper } from '../components/Styled';
import ZoomButton from '../components/CPChartZoomOutButton';
import mockData from '../tests/fixtures/data/traffic.json';
import { ChartEvent, CPChartRect } from '../types';
import CPChartTooltip from '../components/CPChartTooltip';
import { InterpolationType } from '../types/enums';

const { spacing } = ThemeConstants;

const ChartContainer = styled.div`
  width: 800px;
  user-select: none;
  position: relative;
  .zoom-button {
    position: absolute;
    right: 0px;
    top: ${-spacing.absolute.xl}px;
    padding: ${spacing.absolute.xs}px;
    line-height: ${spacing.absolute.xl}px;
    height: ${spacing.absolute.xl}px;
    min-width: ${spacing.absolute.xl}px;
  }
`;

const MIN_ZOOM = 2; // adjust based on your data
const DEFAULT_ZOOM: CPChartRect = {
  x1: 'dataMax',
  y1: 'dataMax + 1',
  x2: 'dataMin',
  y2: 'dataMin',
};
const DEFAULT_HIGHLIGHT_ZOOM: CPChartRect = {
  x1: undefined,
  y1: 'dataMax + 1',
  x2: undefined,
  y2: 'dataMin',
};

export function StackedAreaChartWithZoom() {
  const [isZooming, setIsZooming] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [bounds, setBounds] = useState<CPChartRect>(DEFAULT_ZOOM);
  const [highLight, setHighLight] = useState(DEFAULT_HIGHLIGHT_ZOOM);
  const [data, setData] = useState(mockData);
  const xDataKey = 'timestamp';

  function handleMouseDown(e: ChartEvent) {
    setHighLight(ChartZoom.init(e, highLight, xDataKey, MIN_ZOOM));
    setIsZooming(true);
  }

  function handleMouseMove(e: ChartEvent) {
    const x2 = getEventPayloadValue(e, xDataKey);
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
        ['traffic', 'foo', 'qux'],
        MIN_ZOOM,
        { isStacked: true, offset: 0.5, excludeFromStackKeys: ['qux'] }
      );

      if (zoomed) {
        setData(data.slice());
        setIsZoomedIn(true);
        setHighLight(DEFAULT_HIGHLIGHT_ZOOM);
        setBounds(zoomBounds as CPChartRect);
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
      <h1>Stacked Area Chart with Zoom</h1>
      <p>
        Zooming a stacked area chart involves a bit more complexity to calculate
        the yAxis domain, but this is handled by the ChartZoom utility
      </p>
      <br /> <br />
      <ChartContainer>
        {isZoomedIn && (
          <ZoomButton
            className="zoom-button"
            onClick={zoomOut}
            ariaLabel="zoom out"
          />
        )}
        <ComposedChart
          data={data}
          width={800}
          height={300}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            // These values will change as you zoom in
            domain={[bounds.x1, bounds.x2]}
            type="number"
            dataKey="timestamp"
            tickFormatter={(unixTime) => format(new Date(unixTime), 'HH:mm')}
          />
          <YAxis
            allowDataOverflow
            domain={[bounds.y2, bounds.y1]}
            type="number"
          />
          <Area
            isAnimationActive
            animationEasing="ease-in-out"
            animationDuration={300}
            type={InterpolationType.stepAfter}
            dataKey="traffic"
            fill={CPChartColors.lightPurple}
            stackId="stacked-area"
            stroke={CPChartColors.darkPurple}
            strokeWidth={2}
          />
          <Area
            isAnimationActive
            animationEasing="ease-in-out"
            animationDuration={300}
            type={InterpolationType.stepAfter}
            dataKey="foo"
            stackId="stacked-area"
            fill={CPChartColors.turquoiseBlue}
            stroke={CPChartColors.turquoiseBlue}
            strokeWidth={2}
          />
          <Line
            isAnimationActive
            animationEasing="ease-in-out"
            animationDuration={300}
            type={InterpolationType.stepAfter}
            dataKey="qux"
            fill={CPChartColors.lightOrange}
            stroke={CPChartColors.orange}
            strokeWidth={2}
          />
          <Tooltip content={CPChartTooltip} />
          {isZooming ? (
            <ReferenceArea
              x1={highLight.x1}
              x2={highLight.x2}
              strokeOpacity={0.3}
            />
          ) : null}
        </ComposedChart>
      </ChartContainer>
    </StoryWrapper>
  );
}

export default {
  title: 'Charts/Composed',
  component: ComposedChart,
};
