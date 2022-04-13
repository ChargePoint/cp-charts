import { SymbolMap } from '@common/helpers';
import { hasValue, parseReChartsEventProps } from '@common/utils';

export function mapToolTipItems(items, row, type?: string) {
  return items
    .filter((v) => hasValue(v))
    .map((item) => {
      const { key, shape } = item;
      // shape that will display next to data item in tooltip
      const normalizedShape = shape ?? SymbolMap[type ?? 'line'];
      return {
        ...item,
        label: item.label ?? item.name ?? item.key,
        shape: normalizedShape,
        value: row[key],
      };
    })
    .filter((item) => hasValue(item.value));
}

/**
 * combines user items array with payload array from recharts
 * @param payload c
 * @param items
 * @param row
 * @param seriesType
 * @returns
 */
export function combineToolTipItems(payload, items, row, seriesType) {
  const allItems = []
    .concat(parseReChartsEventProps({ payload }))
    .concat(mapToolTipItems(items, row, seriesType));

  const keys = [];
  return allItems.filter((item) => {
    if (!keys.includes(item.key)) {
      keys.push(item.key);
      return true;
    }

    return false;
  });
}
