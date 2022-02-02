import React, { useEffect, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { format } from "date-fns";

import { getAllDataSetKeys, processTimeSeriesResponse } from "../utils/index";

import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Button } from "./Button";
import ChartService from "../tests/fixtures/ChartService";
import { TimeSeriesRecord } from "../models";
import {
  ChartElementProps,
  InterpolationType,
  SeriesType,
  TimeSeriesData,
} from "../types";
import { renderSeries } from "../components/ChartSeries";
import { KitSpinner } from "@chargepoint/cp-toolkit";
import styled from "styled-components";
import { unstable_batchedUpdates } from "react-dom";

const ChartWrapper = styled.div``;

function getSeries(
  dataKeys: string[],
  seriesType: SeriesType,
  seriesProps: Partial<ChartElementProps>
): ChartElementProps[] {
  return dataKeys.map((dataKey, index: number) => {
    return {
      ...seriesProps,
      stackId: `${seriesType}-${index}`,
      seriesType,
      dataKey,
    };
  });
}

export default {
  title: "Charts/Composed",
  control: ChartWrapper,
};

export const DynamicSeries = ({ interpolationType }) => {
  const [data, setData] = useState<TimeSeriesData[]>();
  const [chartSeries, setChartSeries] = useState<ChartElementProps[]>();

  async function fetchData() {
    const seriesProps = {
      type: interpolationType ?? InterpolationType.monotone,
      unit: "kW",
      connectNulls: true,
    };

    const response =
      (await ChartService.getPowerByVehicle()) as TimeSeriesRecord[];
    const { results } = processTimeSeriesResponse(response);
    const allFields = getAllDataSetKeys(results, ["timestamp"]);
    const series: ChartElementProps[] = getSeries(
      allFields,
      SeriesType.Area,
      seriesProps
    );

    unstable_batchedUpdates(() => {
      setData(results);
      setChartSeries(series);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return (
      <ChartWrapper>
        <KitSpinner />
      </ChartWrapper>
    );
  }

  return (
    <>ASS</>
    // <ComposedChart data={data}>
    //   <YAxis />
    //   <XAxis
    //     dataKey="timestamp"
    //     name="Time"
    //     type="number"
    //     tickCount={7}
    //     tickFormatter={(unixTime) => format(unixTime, "HH:mm")}
    //   />
    //   {chartSeries?.map((series) => renderSeries(series))}
    // </ComposedChart>
  );
};

DynamicSeries.args = {
  interpolationType: Object.values(InterpolationType),
};
