import { ThemeColors, ThemeConstants } from '@chargepoint/cp-toolkit';
import styled from 'styled-components';
import { CPChartColors } from '../common/theme';

export const ChartWrapper = styled.div<{ width?: number }>`
  height: 300px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

export const TooltipContainer = styled.div`
  background: ${ThemeColors.white}cc;
  box-shadow: 0 0 4px 0px rgba(100, 100, 100, 0.2);
  padding: ${ThemeConstants.spacing.absolute.m}px;
  border-radius: ${ThemeConstants.spacing.absolute.s}px;
  border: 1px solid ${CPChartColors.lightGray};
`;
