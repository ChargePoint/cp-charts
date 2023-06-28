export type SortFunc<T = Record<string, unknown>> = (a: T, b: T) => number;

export interface ColumnDef {}

type HeaderCellType<T = 'th'> = T extends 'th' ? typeof TableHeaderCell : typeof TableCell;

function getHeaderCell(col: ColumnDef, index: number, onSortClicked: SortFunc, active: boolean) {
  const Td: HeaderCellType<'td'> = TableCell;
  const Th: HeaderCellType<'th'> = TableHeaderCell;
  const sortKey = col.props?.sortKey ?? (col.field as string);
  const align = (col.props?.align ?? col.align) as CellAlignType;

  if (col.field) {
    if (col?.tag === 'td') {
      <Td align={align} key={`${col.label}-${index}`} {...col.props}>
        {col.label}
      </Td>;
    }

    return (
      <Th
        align={align}
        active={active}
        key={`${col.label}-${index}`}
        {...col.props}
        sortable={!!col.sortFn}
        onSortClicked={(dir: number) => onSortClicked(sortKey, dir)}
        text={col.label}
      ></Th>
    );
  }
  return <th key={`empty-field-${index}`} />;
}

export const TableHead = ({
  columns,
  onSortClicked,
  sortKey,
}: {
  columns: ColumnDef[];
  onSortClicked?: (field: string, dir: number) => void;
  sortKey?: string;
}) => (
  <thead data-qa-id='table-headings'>
    <tr>
      {columns.map((col, i) =>
        getHeaderCell(col, i, onSortClicked as SortFunc, sortKey === col.field)
      )}
    </tr>
  </thead>
);

export interface TableBodyProps<TableData> {
  actionsColumnRenderer?: (row: TableData) => ReactElement;
  columns: ColumnDef[];
  data: TableData[];
  cellFormatter?: (col: ColumnDef, row: TableData) => ReactNode;
  defaultCellProps?: TableCellProps;
}

export function TableBody<TableData = Record<string, unknown>>({
  actionsColumnRenderer,
  columns,
  data,
  cellFormatter,
  defaultCellProps = {},
}: TableBodyProps<TableData>): JSX.Element {
  return (
    <tbody>
      {data.map((row, rowIdx) => (
        <tr key={`${rowIdx}`}>
          {columns.map((col) => (
            <TableCell
              key={col.field}
              {...getCellProps(col, defaultCellProps)}
              maxWidth={col.maxWidth}
            >
              {cellFormatter
                ? cellFormatter(col, row)
                : (row[col.field as keyof TableData] as ReactNode)}
            </TableCell>
          ))}
          {actionsColumnRenderer ? actionsColumnRenderer(row) : null}
        </tr>
      ))}
    </tbody>
  );
}

const CPTable = () => {};

export default CPTable;
