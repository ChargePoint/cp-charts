import { NumberFormatOptions } from '../types';
import { hasValue } from './utils';

const defaultLocale = 'en-US';
let locale = window.navigator.language ?? defaultLocale;

export const setLocale = (loc: string) => {
  locale = loc;
};

export const formatNumber = (
  num: number,
  opts?: NumberFormatOptions
): number | string => {
  const fmt = Intl.NumberFormat([locale], opts ?? {});
  if (hasValue(num) && !Number.isNaN(num)) {
    return fmt.format(num);
  }
  return num ?? '--';
};

export const formatPercent = (
  value: number,
  opts?: NumberFormatOptions
): string => {
  const formatOptions = {
    style: 'percent',
    maximumFractionDigits: 2,
  };
  const formattedPercentage = Intl.NumberFormat(
    [locale],
    opts ?? formatOptions
  );
  return value ? formattedPercentage.format(value * 0.01) : ('-- %' as string);
};

export const formatCurrency = (num: number): string | unknown => {
  const fmt = Intl.NumberFormat([locale], { style: 'currency' });
  if (!Number.isNaN(num)) {
    return fmt.format(num);
  }
  return num ?? '--';
};

export const initialCaps = (s: string) =>
  `${s[0].toUpperCase()}${s.substring(1)}`;
