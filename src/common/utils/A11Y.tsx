/* eslint-disable react/destructuring-assignment, import/prefer-default-export */

// render a table from chart dataset
export const SROnlyTable = ({
  data,
  cols,
  formatter,
  title,
}: {
  data: Record<string, number | unknown>[];
  cols: { field: string; label: string }[];
  formatter: (col: unknown, row: unknown) => string;
  title: string;
}) => {
  return (
    <table className='sr-only'>
      <legend>{title}</legend>
      <thead>
        <tr>
          {cols.map(({ label }) => (
            <th>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {cols.map((col) => {
              return formatter ? formatter(col, row) : (row[col.field] as string);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
