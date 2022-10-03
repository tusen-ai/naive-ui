import { CSSProperties, ComputedRef, computed } from 'vue'
import { formatLength } from '../../_utils'
import type {
  TableExpandColumn,
  TableSelectionColumn,
  TableColumn,
  TableBaseColumn,
  TableColumns,
  ColumnKey,
  DataTableSetupProps
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
  column: TableSelectionColumn | TableExpandColumn | TableBaseColumn
}

type RowItemMap = WeakMap<TableColumn, RowItem>
function getRowsAndCols (
  columns: TableColumns,
  getResizableWidth: (key: ColumnKey) => number | undefined
): {
    hasEllipsis: boolean
    rows: RowItem[][]
    cols: ColItem[]
    dataRelatedCols: Array<
    TableSelectionColumn | TableBaseColumn | TableExpandColumn
    >
  } {
  const rows: RowItem[][] = []
  const cols: ColItem[] = []
  const dataRelatedCols: Array<
  TableSelectionColumn | TableBaseColumn | TableExpandColumn
  > = []
  const rowItemMap: RowItemMap = new WeakMap()
  let maxDepth = -1
  let totalRowSpan = 0
  let hasEllipsis = false
  function ensureMaxDepth (columns: TableColumns, currentDepth: number): void {
    if (currentDepth > maxDepth) {
      rows[currentDepth] = []
      maxDepth = currentDepth
    }
    for (const column of columns) {
      if ('children' in column) {
        ensureMaxDepth(column.children, currentDepth + 1)
      } else {
        const key = 'key' in column ? column.key : undefined
        cols.push({
          key: getColKey(column),
          style: createCustomWidthStyle(
            column,
            key !== undefined ? formatLength(getResizableWidth(key)) : undefined
          ),
          column
        })
        totalRowSpan += 1
        if (!hasEllipsis) {
          hasEllipsis = !!column.ellipsis
        }
        dataRelatedCols.push(column)
      }
    }
  }
  ensureMaxDepth(columns, 0)
  let currentLeafIndex = 0
  function ensureColLayout (columns: TableColumns, currentDepth: number): void {
    let hideUntilIndex = 0
    columns.forEach((column, index) => {
      if ('children' in column) {
        // do not allow colSpan > 1 for non-leaf th
        // we will execute the calculation logic
        const cachedCurrentLeafIndex = currentLeafIndex
        const rowItem: RowItem = {
          column,
          colSpan: 0,
          rowSpan: 1,
          isLast: false
        }
        ensureColLayout(column.children, currentDepth + 1)
        column.children.forEach((childColumn) => {
          rowItem.colSpan += rowItemMap.get(childColumn)?.colSpan ?? 0
        })
        if (cachedCurrentLeafIndex + rowItem.colSpan === totalRowSpan) {
          rowItem.isLast = true
        }
        rowItemMap.set(column, rowItem)
        rows[currentDepth].push(rowItem)
      } else {
        if (currentLeafIndex < hideUntilIndex) {
          currentLeafIndex += 1
          return
        }
        let colSpan: number = 1
        if ('titleColSpan' in column) {
          colSpan = column.titleColSpan ?? 1
        }
        if (colSpan > 1) {
          hideUntilIndex = currentLeafIndex + colSpan
        }
        const isLast = currentLeafIndex + colSpan === totalRowSpan
        const rowItem: RowItem = {
          column,
          colSpan,
          rowSpan: maxDepth - currentDepth + 1,
          isLast
        }
        rowItemMap.set(column, rowItem)
        rows[currentDepth].push(rowItem)
        currentLeafIndex += 1
      }
    })
  }
  ensureColLayout(columns, 0)

  return {
    hasEllipsis,
    rows,
    cols,
    dataRelatedCols
  }
}

export function useGroupHeader (
  props: DataTableSetupProps,
  getResizableWidth: (key: ColumnKey) => number | undefined
): {
    rowsRef: ComputedRef<RowItem[][]>
    colsRef: ComputedRef<ColItem[]>
    hasEllipsisRef: ComputedRef<boolean>
    dataRelatedColsRef: ComputedRef<
    Array<TableSelectionColumn | TableBaseColumn | TableExpandColumn>
    >
  } {
  const rowsAndCols = computed(() =>
    getRowsAndCols(props.columns, getResizableWidth)
  )
  return {
    rowsRef: computed(() => rowsAndCols.value.rows),
    colsRef: computed(() => rowsAndCols.value.cols),
    hasEllipsisRef: computed(() => rowsAndCols.value.hasEllipsis),
    dataRelatedColsRef: computed(() => rowsAndCols.value.dataRelatedCols)
  }
}
