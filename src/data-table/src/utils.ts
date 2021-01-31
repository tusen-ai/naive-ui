import { CSSProperties } from 'vue'
import { formatLength } from '../../_utils'
import type {
  CreateRowKey,
  RowKey,
  SortOrder,
  TableColumnInfo,
  TableNode,
  SortOrderFlag,
  SortState,
  CreateRowClassName
} from './interface'

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
  column: TableColumnInfo,
  index: number
): CSSProperties | undefined {
  if (column.width) {
    const width = column.width
    return {
      width: formatLength(width)
    }
  }
  return undefined
}

export function setCheckStatusOfRow (
  checkedRowKeys: RowKey[],
  row: TableNode,
  checked: boolean,
  rowKey?: CreateRowKey
): void {
  const key = createRowKey(row, rowKey)
  while (true) {
    const checkedRowIndex = checkedRowKeys.findIndex(
      (checkedRowKey) => checkedRowKey === key
    )
    if (~checkedRowIndex) checkedRowKeys.splice(checkedRowIndex, 1)
    else break
  }
  if (checked) checkedRowKeys.push(key)
}

export function createRowKey (row: TableNode, rowKey?: CreateRowKey): RowKey {
  if (rowKey) return rowKey(row)
  return row.key as RowKey
}

export function createRowClassName (
  row: TableNode,
  index: number,
  rowClassName?: string | CreateRowClassName
): string {
  if (typeof rowClassName === 'function') return rowClassName(row, index)
  return rowClassName || ''
}

// for compitablilty
// If column.filterOptionValues or column.defaultFilterOptionValues is set, use
// array value
export function shouldUseArrayInSingleMode (column: TableColumnInfo): boolean {
  return (
    column.filterOptionValues !== undefined ||
    (column.filterOptionValue === undefined &&
      column.defaultFilterOptionValues !== undefined)
  )
}

export function isColumnSortable (column: TableColumnInfo): boolean {
  return !!column.sorter
}

export function isColumnFilterable (column: TableColumnInfo): boolean {
  return !!column.filter && !!column.filterOptions
}

function getNextOrderOf (order: SortOrder): SortOrder {
  if (!order) return 'descend'
  else if (order === 'descend') return 'ascend'
  return false
}

export function createNextSorter (
  currentSortState: SortState | null
): SortState | null {
  if (currentSortState === null) return null
  return {
    ...currentSortState,
    order: getNextOrderOf(currentSortState.order)
  }
}
