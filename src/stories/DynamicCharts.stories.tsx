import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { extent } from "d3-array";

import { getAllDataSetKeys, processTimeSeriesResponse } from "../utils/index";

import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Info } from "../components/Styled";

import ChartService from "../tests/fixtures/ChartService";
import {
  ChartElementProps,
  InterpolationType,
  SeriesType,
  TimeSeriesData,
} from "../types";
import { renderSeries } from "../common/helpers";
import { KitSpinner } from "@chargepoint/cp-toolkit";
import styled from "styled-components";
import { unstable_batchedUpdates } from "react-dom";
import { scaleOrdinal } from "d3-scale";
import { schemeDark2 } from "d3-scale-chromatic";
import CPChartTooltip from "../components/CPChartToolTip";
import { ISO_DATE_TIME } from "../common/constants";

const ChartWrapper = styled.div``;

function getSeries(
  dataKeys: string[],
  seriesType: SeriesType,
  seriesProps: Partial<ChartElementProps>,
  colorDomain,
  labels
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

export const DynamicSeries = ({ interpolationType }) => {
  const { results, labels } = processTimeSeriesResponse(
    ChartService.getPowerByVehicle()
  );
  const xDomain = extent(results, (d: TimeSeriesData) => d.timestamp);

  const seriesProps = {
    type: interpolationType ?? InterpolationType.monotone,
    unit: "kW",
    connectNulls: true,
  };
  const allFields = getAllDataSetKeys(results, ["timestamp"]);
  const colorScale = scaleOrdinal(schemeDark2);
  const colorDomain = colorScale.domain(allFields);
  const chartSeries = getSeries(
    allFields,
    SeriesType.Area,
    seriesProps,
    colorDomain,
    labels
  );

  return (
    <>
      <Info>
        Demonstrating how to handle rendering an unknown number of chart series.
      </Info>
      <ComposedChart data={results} height={300} width={800}>
        <CartesianGrid />
        <Tooltip content={getCustomToolTip} />
        <Legend />
        <YAxis />
        <XAxis
          domain={xDomain}
          dataKey="timestamp"
          name="Time"
          type="number"
          tickFormatter={(unixTime) => format(unixTime, "HH:mm")}
        />
        {chartSeries?.map((series) => renderSeries(series))}
      </ComposedChart>
    </>
  );
};

DynamicSeries.args = {
  interpolationType: InterpolationType.monotone,
};
