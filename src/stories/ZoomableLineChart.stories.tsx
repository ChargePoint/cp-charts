import { useState } from "react";
import { format } from "date-fns";
import {
  XAxis,
  YAxis,
  ReferenceArea,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import { ThemeConstants } from "@chargepoint/cp-toolkit";
import { ChartZoom } from "../common/utils";
import { CPChartColors } from "../common/theme";
import { StoryWrapper } from "../components/Styled";
import ZoomButton from "../components/ZoomOutButton";
import mockData from "../tests/fixtures/data/traffic.json";
import { ComposedChart } from "recharts";
import { ChartEvent, Rect } from "../types";
import CPChartTooltip from "../components/CPChartToolTip";

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
const DEFAULT_ZOOM: Rect = {
  x1: "dataMax",
  y1: "dataMax + 1",
  x2: "dataMin",
  y2: "dataMin",
};
const DEFAULT_HIGHLIGHT_ZOOM: Rect = {
  x1: undefined,
  y1: "dataMax + 1",
  x2: undefined,
  y2: "dataMin",
};

export const MultipleSeriesChartWithZoom = () => {
  const [isZooming, setIsZooming] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [bounds, setBounds] = useState<Rect>(DEFAULT_ZOOM);
  const [highLight, setHighLight] = useState(DEFAULT_HIGHLIGHT_ZOOM);
  const [data, setData] = useState(mockData);
  const xDataKey = "timestamp";

  function handleMouseDown(e: ChartEvent) {
    setHighLight(ChartZoom.init(e, highLight, xDataKey, MIN_ZOOM));
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
        ["traffic", "foo"],
        MIN_ZOOM,
        0.5
      );

      if (zoomed) {
        setData(data.slice());
        setIsZoomedIn(true);
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
      <h1>Multiple Series Area Chart with Zoom</h1>
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
            tickFormatter={(unixTime) => format(new Date(unixTime), "HH:mm")}
          />
          <YAxis
            allowDataOverflow
            domain={[bounds.y2, bounds.y1]}
            type="number"
          />
          <Area
            isAnimationActive={true}
            animationEasing={"ease-in-out"}
            animationDuration={300}
            type="natural"
            dataKey={"traffic"}
            fill={CPChartColors.lightBlue}
            stroke={CPChartColors.blue}
            strokeWidth={2}
          />
          <Line
            isAnimationActive={true}
            animationDuration={300}
            type="natural"
            dataKey={"foo"}
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
};

export default {
  title: "Charts/Composed",
  component: ComposedChart,
};
