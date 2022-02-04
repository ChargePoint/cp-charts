import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { unstable_batchedUpdates } from "react-dom";
import { ScaleOrdinal, scaleOrdinal } from "d3-scale";
import {
  schemeDark2,
  schemeCategory10,
  schemePaired,
  schemeAccent,
  schemeTableau10,
} from "d3-scale-chromatic";
import { format } from "date-fns";
import { extent } from "d3-array";
import { KitSpinner, KitSelect, KitForm } from "@chargepoint/cp-toolkit";

import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { AxisDomain, D3Scale } from "recharts/types/util/types";

import {
  getAllDataSetKeys,
  processTimeSeriesResponse,
} from "../common/utils/index";

import ChartService from "../tests/fixtures/ChartService";
import {
  ChartElementProps,
  InterpolationType,
  SeriesType,
  TimeSeriesData,
} from "../types";

import { ISO_DATE_TIME } from "../common/constants";
import { renderSeries } from "../common/helpers";
import CPChartTooltip from "../components/CPChartToolTip";
import { initialCaps } from "../common/lang";
import {
  ControlBar,
  List,
  ListItem,
  SectionHeader,
  Title,
} from "../components/Styled";

const ChartWrapper = styled.div`
  min-width: 600px;
  width: 100%;
  height: 350px;
`;

function getSeries(
  dataKeys: string[],
  seriesType: SeriesType,
  seriesProps: Partial<ChartElementProps>,
  colorDomain: ScaleOrdinal<string, string>,
  labels: Record<string, string>
): ChartElementProps[] {
  return dataKeys.map((dataKey, index: number) => {
    return {
      ...seriesProps,
      name: labels[dataKey],
      key: `${dataKey}-${index}`,
      stackId: `area`,
      seriesType,
      stroke: colorDomain(dataKey),
      fill: colorDomain(dataKey),
      dataKey,
    };
  });
}

export default {
  title: "Charts/Composed",
  control: ChartWrapper,
};

function getCustomToolTip(props) {
  return (
    <CPChartTooltip
      formatTimeStamp={(row) => format(new Date(row.timestamp), ISO_DATE_TIME)}
      formatter={(key: string, value: number) => {
        return `${value}kw`;
      }}
      {...props}
    />
  );
}

export const ChartExplorer = ({
  interpolationType,
}: {
  interpolationType: InterpolationType;
}) => {
  const [initialized, setInitialized] = useState(false);
  const [seriesType, setSeriesType] = useState(SeriesType.Bar);
  const [colors, setColors] = useState(schemeDark2);
  const [chartWidth, setChartWidth] = useState(800);

  const { results, labels } = processTimeSeriesResponse(
    ChartService.getPowerByVehicle()
  );
  const xDomain = extent(
    results,
    (d: TimeSeriesData) => d.timestamp
  ) as AxisDomain;

  const seriesProps = {
    type: interpolationType ?? InterpolationType.monotone,
    unit: "kW",
    connectNulls: true,
  };
  const allFields = getAllDataSetKeys(results, ["timestamp"]);
  const colorScale = scaleOrdinal(colors);
  const colorDomain = colorScale.domain(allFields);
  const chartSeries = getSeries(
    allFields,
    seriesType,
    seriesProps,
    colorDomain,
    labels
  );

  useEffect(() => {
    setInitialized(true);
    setTimeout(() => {
      // hack to make legend align correctly
      setChartWidth(window.innerWidth - 100);
    }, 250);
  }, []);

  return (
    <>
      <SectionHeader>
        <h3>Chart Explorer</h3>
        <Title>This story demonstrates the following things:</Title>
        <List type="circle">
          <ListItem>
            Use of the `ResponsiveContainer` Recharts component
          </ListItem>
          <ListItem>Rendering an unknown number of series</ListItem>
          <ListItem>
            Transforming dataset from response to chart-friendly
          </ListItem>
          <ListItem>Custom Tooltip</ListItem>
        </List>
      </SectionHeader>
      <ControlBar>
        <KitForm>
          <KitForm.Group>
            <KitForm.Label htmlFor="seriesType" text="Chart Type" />
            <KitSelect
              id="seriesType"
              name="seriesType"
              defaultValue={{
                value: seriesType,
                label: initialCaps(seriesType),
              }}
              onChange={(item: { value: SeriesType }) =>
                setSeriesType(item.value)
              }
              options={[
                { label: "Area", value: SeriesType.Area },
                { label: "Bar", value: SeriesType.Bar },
                { label: "Line", value: SeriesType.Line },
              ]}
            />
          </KitForm.Group>
          <KitForm.Group>
            <KitForm.Label htmlFor="colorScale" text="Color Scale" />
            <KitSelect
              id="colorScale"
              name="colorScale"
              defaultValue={{ value: "schemeDark2", label: "schemeDark2" }}
              onChange={(item: { value: SeriesType }) => setColors(item.value)}
              options={[
                { label: "schemeDark2", value: schemeDark2 },
                { label: "schemeCategory10", value: schemeCategory10 },
                { label: "schemePaired", value: schemePaired },
                { label: "schemeAccent", value: schemeAccent },
                { label: "schemeTableau10", value: schemeTableau10 },
              ]}
            />
          </KitForm.Group>
        </KitForm>
      </ControlBar>
      <ChartWrapper>
        <ResponsiveContainer minHeight={350} width={"100%"}>
          <ComposedChart data={results} height={300} width={800}>
            <CartesianGrid />
            <Tooltip content={getCustomToolTip} />
            <Legend />
            <YAxis
              label={{
                value: "kW",
                position: "insideLeft",
                angle: -90,
              }}
            />
            <XAxis
              domain={xDomain}
              dataKey="timestamp"
              name="Time"
              type="number"
              tickCount={10}
              tickFormatter={(unixTime) => format(unixTime, "HH:mm")}
              padding="gap"
            />
            {chartSeries?.map((series) => renderSeries(series))}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </>
  );
};

ChartExplorer.args = {
  interpolationType: InterpolationType.monotone,
};
