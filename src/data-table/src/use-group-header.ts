import { CSSProperties, ComputedRef, computed } from 'vue'
import { DataTableProps } from './DataTable'
import type {
  SelectionColInfo,
  TableColumn,
  TableColumnInfo,
  TableColumns
} from './interface'
import { getColKey, createCustomWidthStyle } from './utils'

export interface RowItem {
  colSpan: number
  rowSpan: number
  column: TableColumn
  isLast: boolean
}
export interface ColItem {
  key: string | number
  style: CSSProperties
  column: SelectionColInfo | TableColumnInfo
}

type RowItemMap = WeakMap<TableColumn, RowItem>
function getRowsAndCols (
  columns: TableColumns
): {
    rows: RowItem[][]
    cols: ColItem[]
    dataRelatedCols: Array<SelectionColInfo | TableColumnInfo>
  } {
  const rows: RowItem[][] = []
  const cols: ColItem[] = []
  const dataRelatedCols: Array<SelectionColInfo | TableColumnInfo> = []
  const rowItemMap: RowItemMap = new WeakMap()
  let maxDepth = -1
  function ensureMaxDepth (columns: TableColumns, currentDepth: number): void {
    if (currentDepth > maxDepth) {
      rows[currentDepth] = []
      maxDepth = currentDepth
    }
    for (const column of columns) {
      if ('children' in column) {
        ensureMaxDepth(column.children, currentDepth + 1)
      } else {
        cols.push({
          key: getColKey(column),
          style: createCustomWidthStyle(column),
          column
        })
        dataRelatedCols.push(column)
      }
    }
  }
  ensureMaxDepth(columns, 0)
  function ensureColLayout (
    columns: TableColumns,
    currentDepth: number,
    parentIsLast: boolean
  ): void {
    const lastIndex = columns.length - 1
    columns.forEach((column, index) => {
      const isLast = parentIsLast && index === lastIndex
      if ('children' in column) {
        const rowItem: RowItem = {
          column,
          colSpan: 0,
          rowSpan: 1,
          isLast
        }
        ensureColLayout(column.children, currentDepth + 1, isLast)
        column.children.forEach((childColumn) => {
          rowItem.colSpan += rowItemMap.get(childColumn)?.colSpan ?? 0
        })
        rowItemMap.set(column, rowItem)
        rows[currentDepth].push(rowItem)
      } else {
        const rowItem: RowItem = {
          column,
          colSpan: 1,
          rowSpan: maxDepth - currentDepth + 1,
          isLast
        }
        rowItemMap.set(column, rowItem)
        rows[currentDepth].push(rowItem)
      }
    })
  }
  ensureColLayout(columns, 0, true)

  return {
    rows,
    cols,
    dataRelatedCols
  }
}

export function useGroupHeader (
  props: DataTableProps
): {
    rows: ComputedRef<RowItem[][]>
    cols: ComputedRef<ColItem[]>
    dataRelatedCols: ComputedRef<Array<SelectionColInfo | TableColumnInfo>>
  } {
  const rowsAndCols = computed(() => getRowsAndCols(props.columns))
  return {
    rows: computed(() => rowsAndCols.value.rows),
    cols: computed(() => rowsAndCols.value.cols),
    dataRelatedCols: computed(() => rowsAndCols.value.dataRelatedCols)
  }
}
