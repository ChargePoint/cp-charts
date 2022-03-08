export interface NameValue {
  name: string;
  value: number;
}

export interface TimeSeriesRecord {
  time: string; // timestring
  data: NameValue[];
}
