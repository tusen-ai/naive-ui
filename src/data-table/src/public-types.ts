import type { SharedSpinProps } from '../../_internal'
import type { TableBaseColumn } from './interface'

/**
 * Returned string is used as-is in the exported CSV and is not escaped by
 * naive-ui, so escape special characters (commas, quotes, line breaks)
 * yourself if the value may contain them.
 */
export type DataTableGetCsvCell = (
  value: any,
  rowData: object,
  column: TableBaseColumn
) => string
/**
 * Returned string is used as-is in the exported CSV and is not escaped by
 * naive-ui, so escape special characters (commas, quotes, line breaks)
 * yourself if the value may contain them.
 */
export type DataTableGetCsvHeader = (column: TableBaseColumn) => string
export type DataTableSize = 'small' | 'medium' | 'large'
export type DataTableSpinProps = SharedSpinProps
