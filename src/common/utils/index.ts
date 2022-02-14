import { TimeSeriesRecord } from "@models";
import { TimeSeriesData } from "@types";
import { LegendProps } from "recharts";

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
  payload: LegendProps[];
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
// const mergeDataSetsOnTimeStamp = (arr1, arr2, arr3, arr4, arr5? TimeSeriesData[]) => {

// }

// return the new top and bottom values of the yAxis for when zooming in 
export const getYAxisDomain = (
  data: any[],
  from: any,
  to: any,
  xRef: string | number,
  yRef: string | number,
  offset?: number
) => {
  // Filter the data to show selected range based on X-Axis
  let refData;
  // Check data type
  if (typeof data[0][xRef] === "string") {
    // This section finds the array indexes of the from and to values and then slices the data between those values
    // to get the range inbetween
    const fromPoint = data.findIndex((item) => item[xRef] === from);
    const toPoint = data.findIndex((item) => item[xRef] === to);
    refData = data.slice(fromPoint, toPoint);
  } else {
    // Filter by all values that fit in the range between from - to
    refData = data.filter((item) => item[xRef] <= to && item[xRef] >= from);
  }
  // Get Y-Axis lower and upper values
  let [bottom, top] = [refData[0][yRef], refData[0][yRef]];
  // This portion sets the lowest and highest (bottom and top respectively) values that will be on the y-Axis
  refData.forEach((data) => {
    if (data[yRef] > top) top = data[yRef];
    if (data[yRef] < bottom) bottom = data[yRef];
  });
  // Offset the data if an offset is provided
  return [(bottom || 0) - (offset ?? 0), (top || 0) + (offset ?? 0)];
};