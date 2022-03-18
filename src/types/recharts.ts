export interface ReChartsEventPayload {
  dataKey: string;
  fill: string;
  name: string;
  shape?: string;
  stroke?: string;
  unit?: string;
  value?: string | number | unknown;
  payload: Record<string, number>;
}
