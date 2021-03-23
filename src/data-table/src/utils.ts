import { CSSProperties } from 'vue'
import { pxfy } from 'seemly'
import type {
  SortOrder,
  TableColumnInfo,
  TableNode,
  SortOrderFlag,
  SortState,
  CreateRowClassName,
  SelectionColInfo,
  TableColumnGroup,
  TableColumn
} from './interface'

export const selectionColWidth = 40

export function getColWidth (
  col: TableColumnInfo | SelectionColInfo
): number | undefined {
  if (col.type === 'selection') return selectionColWidth
  return col.width
}

export function getColKey (
  col: TableColumnInfo | SelectionColInfo | TableColumnGroup
): string | number {
  if (col.type === 'selection') return '__n_selection__'
  return col.key
}

export function createShallowClonedObject<T> (object: T): T {
  if (!object) return object
  if (typeof object === 'object') {
    return Object.assign({}, object)
  }
  return object
}

export function getFlagOfOrder (order: SortOrder): SortOrderFlag {
  if (order === 'ascend') return 1
  else if (order === 'descend') return -1
  return 0
}

export function createCustomWidthStyle (
  column: TableColumnInfo | SelectionColInfo
): CSSProperties {
  return {
    width: pxfy(getColWidth(column))
  }
}

export function createRowClassName (
  row: TableNode,
  index: number,
  rowClassName?: string | CreateRowClassName
): string {
  if (typeof rowClassName === 'function') return rowClassName(row, index)
  return rowClassName || ''
}

// for compatibility
// If column.filterOptionValues or column.defaultFilterOptionValues is set, use
// array value
export function shouldUseArrayInSingleMode (column: TableColumnInfo): boolean {
  return (
    column.filterOptionValues !== undefined ||
    (column.filterOptionValue === undefined &&
      column.defaultFilterOptionValues !== undefined)
  )
}

export function isColumnSortable (column: TableColumn): boolean {
  if ('children' in column) return false
  return !!column.sorter
}

export function isColumnFilterable (column: TableColumn): boolean {
  if ('children' in column) return false
  return (
    !!column.filter && (!!column.filterOptions || !!column.renderFilterMenu)
  )
}

function getNextOrderOf (order: SortOrder): SortOrder {
  if (!order) return 'descend'
  else if (order === 'descend') return 'ascend'
  return false
}

export function createNextSorter (
  column: TableColumnInfo,
  currentSortState: SortState | null
): SortState | null {
  if (column.sorter === undefined) return null
  if (currentSortState === null || currentSortState.columnKey !== column.key) {
    return {
      columnKey: column.key,
      sorter: column.sorter,
      order: getNextOrderOf(false)
    }
  } else {
    return {
      ...currentSortState,
      order: getNextOrderOf(currentSortState.order)
    }
  }
}
