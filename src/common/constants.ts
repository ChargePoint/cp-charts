import { Rect } from '../types';

export const ISO_DATE = 'yyyy-MM-dd';
export const ISO_DATE_TIME = 'yyyy-MM-dd HH:mm';
export const ISO_DATE_TIME_WITH_SECONDS = 'yyyy-MM-dd KK:mm:ss';
export const ISO_TIME = 'HH:mm';

// Chart Defaults
// Note: many charts will need the ability to define their own defaults,
// but these are good out-of-the-box values
export const MIN_ZOOM = 2;
export const DEFAULT_ZOOM: Rect = {
  x1: 'dataMax',
  y1: 'dataMax + 1',
  x2: 'dataMin',
  y2: 'dataMin + 1',
};

export const DEFAULT_HIGHLIGHT_ZOOM: Rect = {
  x1: undefined,
  y1: 'dataMax',
  x2: undefined,
  y2: 'dataMin',
};
