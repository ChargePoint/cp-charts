import { LegendPayload } from "recharts";
import { TimeSeriesRecord } from "../models";
import { TimeSeriesData } from "../types";

// basic test for required fields
export const hasValue = (val: unknown | unknown[]): boolean =>
  Array.isArray(val)
    ? val.filter((v) => hasValue(v)).length === val.length
    : val !== undefined && val !== null && val !== "";

/*
 Returns a list of all the unique keys that are used in the dataset.
 Note: Depending on the size fo the dataset, this could be expensive.
 @param data Array<TimeSeriesData>
 @param keysToRemove Array<string>
*/
export const getAllDataSetKeys = (
  data: TimeSeriesData[],
  keysToRemove: string[]
) => {
  const keyList: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const keys = Object.keys(row);
    keys.forEach((key) => {
      if (!keyList.includes(key)) {
        keyList.push(key);
      }
    });
  }

  if (keysToRemove) {
    return keyList.filter((key) => !keysToRemove.includes(key));
  }
  return keyList;
};

// converts timeseries api response format to common format that recharts uses
export const processTimeSeriesResponse = (
  response: TimeSeriesRecord[]
): { results: TimeSeriesData[]; labels: Record<string, string> } => {
  const labels = {};
  const results = response.map(({ time, data }) => {
    const record: TimeSeriesData = {
      timestamp: new Date(time).getTime(),
    };

    data.forEach(({ name, value }) => {
      // convert item name to safe key
      const key = name.replace(/[\s\':+-.]/g, "_").toLocaleLowerCase();
      record[key] = value;
      labels[key] = name;
    });

    return record;
  });

  return {
    results,
    labels,
  };
};

export const parseReChartsEventProps = ({
  payload,
}: {
  payload: LegendPayload[];
}) => {
  if (payload && payload.length) {
    return payload?.map(
      ({ dataKey, name, stroke, fill: color, unit, shape, value }) => ({
        color,
        key: dataKey,
        label: name,
        shape,
        value,
        unit,
      })
    );
  }

  return [];
};
