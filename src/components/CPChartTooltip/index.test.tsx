import { mapToolTipItems } from './utils';

describe('Tests tooltip functionality', () => {
  test('mapToolTipItems should correctly map input items array', () => {
    const result = mapToolTipItems(
      [
        {
          label: 'Corn Flakes',
          shape: 'circle',
          key: 'cf',
        },
        {
          label: 'Golden Grahams',
          shape: 'square',
          key: 'gg',
        },
      ],
      {
        cf: 4,
        gg: 7,
      }
    );
    expect(result).toEqual([
      {
        label: 'Corn Flakes',
        shape: 'circle',
        key: 'cf',
        value: 4,
      },
      {
        label: 'Golden Grahams',
        shape: 'square',
        key: 'gg',
        value: 7,
      },
    ]);
  });
});
