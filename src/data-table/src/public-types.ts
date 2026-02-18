import type { SharedSpinProps } from '../../_internal'
import type { TableBaseColumn } from './interface'

export type DataTableGetCsvCell = (
  value: any,
  rowData: object,
  column: TableBaseColumn
) => string
export type DataTableGetCsvHeader = (column: TableBaseColumn) => string
export type DataTableSize = 'small' | 'medium' | 'large'
export type DataTableSpinProps = SharedSpinProps
