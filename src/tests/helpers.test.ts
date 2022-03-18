import { getSymbolType, SymbolTypes } from '../common/helpers';

describe('cp-charts helper tests', () => {
  test('getSymbolType should always return a valid symbol type', () => {
    expect(getSymbolType(SymbolTypes.CIRCLE)).toEqual(SymbolTypes.CIRCLE);
    expect(getSymbolType('foo' as SymbolTypes)).toEqual(SymbolTypes.CIRCLE);
  });
});
