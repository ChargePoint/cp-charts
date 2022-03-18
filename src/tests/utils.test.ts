import {
  cleanKey,
  getAllDataSetKeys,
  getEventPayloadValue,
  getYAxisDomain,
  hasValue,
  processTimeSeriesResponse,
} from '../common/utils';

describe('Chart Utility tests', () => {
  test('cleanKey strips invalid chars from string', () => {
    expect(cleanKey('Name with spaces')).toEqual('name_with_spaces');
    expect(cleanKey("Name with 'invalid chars': Test")).toEqual(
      'name_with__invalid_chars___test'
    );
    expect(`${cleanKey(undefined as unknown as string)}`).toEqual('undefined');
  });

  test('getAllDataSetKeys returns all unique keys found in dataset', () => {
    const data = [
      { a: 'Hello', b: 'World', timestamp: 123456 },
      { a: 'Foo', b: 'Bar', timestamp: 123456 },
      { b: 'Farm', c: 'Table', timestamp: 123456 },
      { a: 'qux', d: 'quux', timestamp: 123456 },
    ];

    expect(getAllDataSetKeys(data)).toEqual(['a', 'b', 'c', 'd', 'timestamp']);
  });

  test('hasValue should return true when value is not undefined | null | ""', () => {
    expect(hasValue(null)).toEqual(false);
    expect(hasValue('')).toEqual(false);
    expect(hasValue(undefined)).toEqual(false);
    expect(hasValue(0)).toEqual(true);
    expect(hasValue('Hello')).toEqual(true);
  });

  test('getYAxisDomain should return minimum and maximum values from dataset between specific x-axis values', () => {
    const data = [
      {
        time: 0,
        value: 1,
      },
      {
        time: 1,
        value: 2,
      },
      {
        time: 2,
        value: 3,
      },
      {
        time: 3,
        value: 0,
      },
      {
        time: 4,
        value: 2,
      },
      {
        time: 4.5,
        value: 6,
      },
      {
        time: 5,
        value: 4,
      },
    ];
    const domain = getYAxisDomain(data, 3, 5, 'time', 'value');
    expect(domain).toEqual([0, 6]);
  });

  test('processTimeSeriesResponse converts TimeSeriesRecord format to TimeSeriesData', () => {
    const result = processTimeSeriesResponse([
      {
        time: '2022-01-04 15:15:00.000000000',
        data: [
          {
            name: 'Item One',
            value: 6.174,
          },
        ],
      },
      {
        time: '2022-01-04 15:30:00.000000000',
        data: [
          {
            name: 'Item One',
            value: 4.3,
          },
          {
            name: 'Item Two',
            value: 5.23,
          },
        ],
      },
    ]);

    expect(result).toEqual({
      labels: { item_one: 'Item One', item_two: 'Item Two' },
      results: [
        {
          timestamp: 1641338100000,
          item_one: 6.174,
        },
        {
          timestamp: 1641339000000,
          item_one: 4.3,
          item_two: 5.23,
        },
      ],
    });
  });

  test('getEventPayloadValue should return value of Chart Mouse event if one exists', () => {
    expect(
      getEventPayloadValue(
        {
          chartX: 0,
          chartY: 0,
          activePayload: [
            {
              payload: { foo: 1, qux: 2 },
            },
          ],
        },
        'foo'
      )
    ).toEqual(1);
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(getEventPayloadValue({}, 'foo')).toBeNull();
});
