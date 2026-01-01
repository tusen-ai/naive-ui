import type { TableBaseColumn } from './interface'

export type DataTableGetCsvCell = (
  value: any,
  rowData: object,
  column: TableBaseColumn
) => string
export type DataTableGetCsvHeader = (column: TableBaseColumn) => string
