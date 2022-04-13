import styled from 'styled-components';
import { ThemeColors, ThemeConstants } from '@chargepoint/cp-toolkit';
import { CPChartsThemeSchema } from '@common/theme';

const { fontSize, fontWeight, spacing } = ThemeConstants;

export const CustomTooltipWrapper = styled.div<{ opacity?: number }>`
  background: ${({ theme }) =>
    theme?.components?.tooltip.bg ?? ThemeColors.white};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  color: ${({ theme }) => theme?.components?.tooltip.text};
  border-radius: ${spacing.absolute.xs}px;
  border: 1px solid ${({ theme }) => theme?.components?.tooltip.border};
  padding: ${spacing.absolute.s}px;
  font-size: ${fontSize.text_12}rem;
`;

export const TooltipTitle = styled.div<{ theme?: CPChartsThemeSchema }>`
  margin: ${spacing.absolute.xs}px;
  margin-left: ${spacing.absolute.m + spacing.absolute.xs}px;
  margin-top: ${spacing.absolute.m}px;
  font-size: ${fontSize.text_12}rem;
  color: ${({ theme }) =>
    theme?.components?.tooltip.title ?? ThemeColors.gray_50};
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  li {
    display: flex;
    align-items: center;
    padding: ${spacing.absolute.xxs}px;
    margin-bottom: ${spacing.absolute.xs}px;
  }
`;

export const TooltipSeriesSymbol = styled.span`
  cursor: pointer;
  margin-right: ${spacing.absolute.s}px;
`;

export const Label = styled.span`
  color: ${({ theme }) =>
    theme?.components?.tooltip.label ?? ThemeColors.gray_40};
  font-weight: ${fontWeight.bold};
  margin-right: ${spacing.absolute.xs}px;
`;

export const Value = styled.span`
  color: ${({ theme }) =>
    theme?.components?.tooltip.value ?? ThemeColors.gray_40};
`;
