import { TimeSeriesRecord } from "@models";
import { TimeSeriesData } from "@types";
import { LegendProps } from "recharts";
import { ChartEvent, Rect } from "types";

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

// return the new top and bottom values of the yAxis for when zooming in .
/* 
   data - the dataset that is used to render the graph
   from - the beginning of the range selection based on a key in your dataset. Eg. date, time, numbers, percentage etc... 
   to -   the end of the range selection based on a key in your dataset. Eg date, time, numbers, percentage etc... 
   xKey - the key that is used to populate the xAxis
   yKey - the key that is used to populate the yAxis
   offset - the value to offset the yAxis by. Eg if offset is 1 and the yAxis starts at 1, then it will instead start at 0
*/
export const getYAxisDomain = (
  data: any[],
  from: any,
  to: any,
  xKey: string | number,
  yKey: string | number,
  offset?: number
) => {
  // Filter the data to show selected range based on X-Axis
  let refData;
  // Check data type
  if (typeof data[0][xKey] === "string") {
    // This section finds the array indexes of the from and to values and then slices the data between those values
    // to get the range inbetween
    const fromPoint = data.findIndex((item) => item[xKey] === from);
    const toPoint = data.findIndex((item) => item[xKey] === to);
    refData = data.slice(fromPoint, toPoint);
  } else {
    // Filter by all values that fit in the range between from - to
    refData = data.filter((item) => item[xKey] <= to && item[xKey] >= from);
  }
  // Get Y-Axis lower and upper values
  let [bottom, top] = [refData[0][yKey], refData[0][yKey]];
  // This portion sets the lowest and highest (bottom and top respectively) values that will be on the y-Axis
  refData.forEach((data) => {
    if (data[yKey] > top) top = data[yKey];
    if (data[yKey] < bottom) bottom = data[yKey];
  });
  // Offset the data if an offset is provided
  // The first part is the lowest yAxis value, the second part is the highest yAxis value
  return [(bottom || 0) - (offset ?? 0), (top || 0) + (offset ?? 0)];
};

export const ChartZoom = {
  init(e: ChartEvent, prevZoom: Rect, xKey: string, offset: number = 0) {
    const { activePayload } = e || {};
    const { payload } = activePayload[0];
    return {
      ...prevZoom,
      x1: payload[xKey],
      x2: payload[xKey] + offset,
    };
  },
  getEventPayloadValue(e: ChartEvent, dataKey: string) {
    const { activePayload } = e || {};
    if (activePayload?.length) {
      return activePayload[0].payload[dataKey];
    }
  },
  getBounds(
    prevZoom: Rect,
    data: TimeSeriesData[],
    xKey: string,
    yKey: string,
    minZoom: number,
    offset: number = 0
  ) {
    let { x1, x2 } = prevZoom;
    // don't zoom in if the user just clicked the chart without dragging a zoom area
    if (Math.abs((x1 as number) - (x2 as number)) <= minZoom || !hasValue(x2)) {
      return { zoomed: false };
    }

    // ensure x1 <= x2
    if ((x1 as unknown as number) > (x2 as unknown as number)) {
      [x1, x2] = [x2, x1];
    }

    // set new top and bottom values of the yAxis domain
    const [_y2, _y1] = getYAxisDomain(data, x1, x2, xKey, yKey, offset);

    return {
      zoomed: true,
      zoomBounds: { x1, x2, y1: _y1, y2: _y2 } as Rect,
    };
  },
};
