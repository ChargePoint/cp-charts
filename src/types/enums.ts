export enum SeriesType {
  Area = 'area',
  Bar = 'bar',
  Line = 'line',
  ReferenceLine = 'referenceLine',
}

// curve interpolation type for chart series
//  @see https://github.com/d3/d3-shape#curves
export enum InterpolationType {
  basis = 'basis',
  basisClosed = 'basisClosed',
  basisOpen = 'basisOpen',
  linear = 'linear',
  linearClosed = 'linearClosed',
  natural = 'natural',
  monotoneX = 'monotoneX',
  monotoneY = 'monotoneY',
  monotone = 'monotone',
  step = 'step',
  stepBefore = 'stepBefore',
  stepAfter = 'stepAfter',
}

export enum UnitsSymbol {
  kiloWatt = 'kW',
  kiloWattHour = 'kWh',
  celsius = 'C°',
  fahrenheit = 'F°',
}

export enum LabelPosition {
  insideBottom = 'insideBottom',
  insideBottomLeft = 'insideBottomLeft',
  insideBottomRight = 'insideBottomRight',
  insideLeft = 'insideLeft',
  insideRight = 'insideRight',
  center = 'center',
  insideTop = 'insideTop',
  insideTopLeft = 'insideTopLeft',
  insideTopRight = 'insideTopRight',
}
