import type {
  CreateSummary as InternalCreateSummary,
  RowData
} from './src/interface'

export type CreateSummary = InternalCreateSummary<RowData>

export { default as NDataTable } from './src/DataTable'
export type { DataTableProps } from './src/DataTable'
export type {
  RenderFilter as DataTableRenderFilter,
  RenderSorter as DataTableRenderSorter,
  ColumnKey as DataTableColumnKey,
  TableColumn as DataTableColumn,
  TableColumns as DataTableColumns,
  TableBaseColumn as DataTableBaseColumn,
  TableSelectionColumn as DataTableSelectionColumn,
  TableExpandColumn as DataTableExpandColumn,
  CreateRowClassName as DataTableCreateRowClassName,
  CreateRowKey as DataTableCreateRowKey,
  CreateRowProps as DataTableCreateRowProps,
  DataTableInst,
  SummaryRowData,
  SummaryCell
} from './src/interface'
