import React from 'react';
import { render } from '@testing-library/react';
import KitChart, { ChartSeries } from '../components/KitCharts';
import { ThemeProvider } from 'styled-components';
import { cpLightTheme } from '@chargepoint/cp-toolkit';
import { createDataPoints } from '../common/constants';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('KitChart', () => {
  const chart = (
    <ThemeProvider theme={cpLightTheme}>
        <KitChart
            id='test-charge'
            data={createDataPoints(10)}
            showScrollbar={true}
            chartSeries={ChartSeries.Column}
        />
    </ThemeProvider>
  );
  test('KitCharts renders without errors', () => {
    render(chart);
  });

  test('KitCharts passes Axe A11Y checks', async () => {
    const { container } = render(chart);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
