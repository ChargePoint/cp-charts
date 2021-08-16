import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Constructor } from '@amcharts/amcharts4/core';
import { ColumnSeries, LineSeries } from '@amcharts/amcharts4/charts';
import styled, { ThemeContext } from 'styled-components';
import { ThemeConstants } from '@chargepoint/cp-toolkit';

am4core.useTheme(am4themes_animated);

export interface KitChartDataPoint {
  date: Date;
  value: number;
}

export interface KitChartProps {
  id: string;
  className?: string;
  data: Array<KitChartDataPoint>;
  chartSeries: Constructor<ColumnSeries | LineSeries>;
  showScrollbar?: boolean;
  dateAxisTitle?: string;
  yAxisTitle?: string;
  intlLocales?: string;
  tooltipText?: string;
}

export const ChartSeries = {
  Column: ColumnSeries,
  Line: LineSeries,
};

const Wrapper = styled.div`
  font-family: ${ThemeConstants.fontFamily.primary};
  font-size: ${ThemeConstants.baseFontSize}px;
  font-weight: ${ThemeConstants.fontWeight.normal};
  color: '${({ theme }) => theme.page.body.text}';
`;

function KitChart(props: KitChartProps) {
  const barChart = useRef(null);
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
    dateAxis.title.fill = am4core.color(themeContext.page.body.text.toString());
    dateAxis.renderer.labels.template.fill = am4core.color(themeContext.page.body.text.toString());

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.tooltip.disabled = true;
    if (props.yAxisTitle) {
      yAxis.title.text = props.yAxisTitle;
    }
    yAxis.title.fill = am4core.color(themeContext.page.body.text.toString());
    yAxis.renderer.labels.template.fill = am4core.color(themeContext.page.body.text.toString());

    const series = chart.series.push(new props.chartSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.tooltipText = props.tooltipText; // "[bold]{valueY}[/] kWh";
    series.fillOpacity = 0.3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.opacity = 0;

    const xyChartScrollbar = new am4charts.XYChartScrollbar();
    xyChartScrollbar.series.push(series);
    chart.scrollbarX = xyChartScrollbar;

    dateAxis.keepSelection = true;

    barChart.current = chart;

    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [props.data]);

  useEffect(() => {
    barChart.current.scrollbarX.disabled = !props.showScrollbar;
  }, [props.showScrollbar]);

  useEffect(() => {
    barChart.current.xAxes.values[0].title.text = props.dateAxisTitle;
  }, [props.dateAxisTitle]);

  useEffect(() => {
    barChart.current.yAxes.values[0].title.text = props.yAxisTitle;
  }, [props.yAxisTitle]);

  useEffect(() => {
    barChart.current.dateFormatter.intlLocales = props.intlLocales;
  }, [props.intlLocales]);

  useEffect(() => {
    barChart.current.series.values[0].tooltipText = props.tooltipText;
  }, [props.tooltipText]);

  return <Wrapper id={props.id} className={props.className} />;
}

KitChart.defaultProps = {
  showScrollbar: false,
  dateAxisTitle: null,
  yAxisTitle: null,
  intlLocales: 'en-US',
  tooltipText: '[bold]{valueY}[/]',
};

export default KitChart;
