import React, { useContext, useLayoutEffect, useRef } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Constructor } from '@amcharts/amcharts4/core';
import { ColumnSeries, LineSeries } from '@amcharts/amcharts4/charts';
import styled, { ThemeContext } from 'styled-components';
import { ThemeConstants } from '@chargepoint/cp-toolkit';

am4core.useTheme(am4themes_animated);

/*
  Example:
  {
    date: <Date>,
    vehicle1: 10,
    vehicle2: 2,
    vehicle3: 33,
  }
*/
export interface KitChartStackedDataPoint {
  date: Date;
  [propName: string]: any;
}

interface KitChartStackedProps {
  id: string;
  className?: string;
  data: Array<KitChartStackedDataPoint>;
  dataPointKeyNames: Array<string>; // ["vehicle1", "vehicle2", ...]
  chartSeries: Constructor<ColumnSeries | LineSeries>;
  showScrollbar?: boolean;
  dateAxisTitle?: string;
  yAxisTitle?: string;
  intlLocales?: string;
}

export const ChartSeries = {
  Column: ColumnSeries,
  Line: LineSeries,
};

const Wrapper = styled.div`
  font-family: ${ThemeConstants.fontFamily.primary};
  font-size: ${ThemeConstants.baseFontSize}px;
  font-weight: ${ThemeConstants.fontWeight.normal};
  color: ${({ theme }) => theme.page.body.text};
`;

function KitChartStacked(props: KitChartStackedProps) {
  const areaChart = useRef(null);
  const themeContext = useContext(ThemeContext);

  useLayoutEffect(() => {
    const chart = am4core.create(props.id, am4charts.XYChart);
    chart.data = props.data;
    chart.dateFormatter.intlLocales = props.intlLocales;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = {
      timeUnit: 'minute',
      count: 1,
    };

    dateAxis.tooltipDateFormat = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    dateAxis.renderer.labels.template.fill = am4core.color(themeContext.page.body.text.toString());
    if (props.dateAxisTitle) {
      dateAxis.title.text = props.dateAxisTitle;
    }

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.tooltip.disabled = true;
    if (props.yAxisTitle) {
      yAxis.title.text = props.yAxisTitle;
    }
    yAxis.title.fill = am4core.color(themeContext.page.body.text.toString());
    yAxis.renderer.labels.template.fill = am4core.color(themeContext.page.body.text.toString());

    for (const keyName of props.dataPointKeyNames) {
      const series = chart.series.push(new props.chartSeries());
      series.dataFields.dateX = 'date';
      series.name = keyName;
      series.dataFields.valueY = keyName;
      series.tooltipHTML =
        "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series.tooltipText = '[#000]{valueY.value}[/]';
      series.tooltip.background.fill = am4core.color('#FFF');
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
    }

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';

    dateAxis.keepSelection = true;

    areaChart.current = chart;

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [props]);

  return <Wrapper id={props.id} className={props.className} />;
}

KitChartStacked.defaultProps = {
  showScrollbar: false,
  dateAxisTitle: null,
  yAxisTitle: null,
  intlLocales: 'en-US',
};

export default KitChartStacked;