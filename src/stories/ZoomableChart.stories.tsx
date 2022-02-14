import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ReferenceArea,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { KitButton } from "@chargepoint/cp-toolkit";
import { getYAxisDomain } from "../common/utils";
import { CPChartColors } from "../common/theme";
import { StoryWrapper } from "../components/Styled";

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

export const ZoomableBarChart = () => {
  const [highlightLeftArea, setHighlightLeftArea] = useState("");
  const [highlightRightArea, setHighlightRightArea] = useState("");
  const [left, setLeft] = useState("dataMin");
  const [right, setRight] = useState("dataMax");
  const [bottom, setBottom] = useState("dataMin");
  const [top, setTop] = useState("dataMax");
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [data, setData] = useState(mockData);

  const zoomIn = () => {
    if (highlightLeftArea === highlightRightArea || highlightRightArea === "") {
      setHighlightLeftArea("");
      setHighlightRightArea("");
      return;
    }

    // set new left and right values of the xAxis domain
    if (highlightLeftArea > highlightRightArea) {
      setHighlightLeftArea(highlightRightArea);
      setHighlightRightArea(highlightLeftArea);
    }

    // set new top and bottom values of the yAxis domain
    const [_bottom, _top] = getYAxisDomain(
      data,
      highlightLeftArea,
      highlightRightArea,
      "timestamp",
      "traffic",
      1
    );

    setIsZoomedIn(true);
    setData(data.slice());
    setLeft(highlightLeftArea);
    setRight(highlightRightArea);
    setHighlightLeftArea("");
    setHighlightRightArea("");
    setBottom(_bottom);
    setTop(_top);
  };

  const zoomOut = () => {
    setIsZoomedIn(false);
    setData(mockData);
    setLeft("dataMin");
    setRight("dataMax");
    setHighlightLeftArea("");
    setHighlightRightArea("");
    setBottom("dataMin");
    setTop("dataMax");
  };

  return (
    <StoryWrapper>
      <h1>Bar Chart with Zoom</h1>
      {isZoomedIn && <KitButton onClick={zoomOut}>Zoom Out</KitButton>}
      <ResponsiveContainer width={700} height={200}>
        <BarChart
          data={mockData}
          width={700}
          height={200}
          onMouseDown={(e) => setHighlightLeftArea(e?.activeLabel)}
          onMouseMove={(e) => highlightLeftArea && setHighlightRightArea(e?.activeLabel)}
          onMouseUp={() => zoomIn()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            height={48}
            // These values will change as you zoom in
            domain={[left, right]}
            type="number"
            dataKey="timestamp"
          />
          <YAxis allowDataOverflow domain={[bottom, top]} />
          <Bar dataKey={"traffic"}>
            {data.map((entry) => (
              <Cell key={entry.timestamp}
                fill={entry.now ? CPChartColors.pink : CPChartColors.lightGray}
              />
            ))}
          </Bar>
          {/* This is to show the area that is being highlighted/selected */}
          {highlightLeftArea && highlightRightArea ? (
            <ReferenceArea x1={highlightLeftArea} x2={highlightRightArea} strokeOpacity={0.3} />
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    </StoryWrapper>
  );
};

export default {
  title: "Charts/Bar",
  component: BarChart,
};
