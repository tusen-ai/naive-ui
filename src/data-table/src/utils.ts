import type { CSSProperties } from 'vue'
import { depx } from 'seemly'
import { formatLength } from '../../_utils'
import type {
  CreateRowClassName,
  InternalRowData,
  RowData,
  SortOrder,
  SortOrderFlag,
  SortState,
  TableBaseColumn,
  TableColumn,
  TableExpandColumn,
  TableSelectionColumn
} from './interface'

export const SELECTION_COL_WIDTH = 40
export const EXPAND_COL_WIDTH = 40

export function getNumberColWidth(col: TableColumn): number | undefined {
  if (col.type === 'selection') {
    return col.width === undefined ? SELECTION_COL_WIDTH : depx(col.width)
  }
  if (col.type === 'expand') {
    return col.width === undefined ? EXPAND_COL_WIDTH : depx(col.width)
  }
  if ('children' in col)
    return undefined
  if (typeof col.width === 'string') {
    return depx(col.width)
  }
  return col.width
}

export function getStringColWidth(col: TableColumn): string | undefined {
  if (col.type === 'selection') {
    return formatLength(col.width ?? SELECTION_COL_WIDTH)
  }
  if (col.type === 'expand') {
    return formatLength(col.width ?? EXPAND_COL_WIDTH)
  }
  if ('children' in col) {
    return undefined
  }
  return formatLength(col.width)
}

export function getColKey(col: TableColumn): string | number {
  if (col.type === 'selection')
    return '__n_selection__'
  if (col.type === 'expand')
    return '__n_expand__'
  return col.key
}

export function createShallowClonedObject<T>(object: T): T {
  if (!object)
    return object
  if (typeof object === 'object') {
    return Object.assign({}, object)
  }
  return object
}

export function getFlagOfOrder(order: SortOrder): SortOrderFlag {
  if (order === 'ascend')
    return 1
  else if (order === 'descend')
    return -1
  return 0
}

// priority: min-width > max-width > width
export function clampValueFollowCSSRules(
  value: number,
  min?: number | string,
  max?: number | string
): number {
  if (max !== undefined) {
    value = Math.min(
      value,
      typeof max === 'number' ? max : Number.parseFloat(max)
    )
  }
  if (min !== undefined) {
    value = Math.max(
      value,
      typeof min === 'number' ? min : Number.parseFloat(min)
    )
  }
  return value
}

export function createCustomWidthStyle(
  column: TableBaseColumn | TableSelectionColumn | TableExpandColumn,
  resizedWidth?: string
): CSSProperties {
  if (resizedWidth !== undefined) {
    return {
      width: resizedWidth,
      minWidth: resizedWidth,
      maxWidth: resizedWidth
    }
  }
  const width = getStringColWidth(column)
  const { minWidth, maxWidth } = column
  return {
    width,
    minWidth: formatLength(minWidth) || width,
    maxWidth: formatLength(maxWidth)
  }
}

export function createRowClassName(
  row: InternalRowData,
  index: number,
  rowClassName?: string | CreateRowClassName
): string {
  if (typeof rowClassName === 'function')
    return rowClassName(row, index)
  return rowClassName || ''
}

// for compatibility
// If column.filterOptionValues or column.defaultFilterOptionValues is set, use
// array value
export function shouldUseArrayInSingleMode(column: TableBaseColumn): boolean {
  return (
    column.filterOptionValues !== undefined
    || (column.filterOptionValue === undefined
      && column.defaultFilterOptionValues !== undefined)
  )
}

export function isColumnSortable(column: TableColumn): boolean {
  if ('children' in column)
    return false
  return !!column.sorter
}

export function isColumnResizable(column: TableColumn): boolean {
  if ('children' in column && !!column.children.length)
    return false
  return !!column.resizable
}

export function isColumnFilterable(column: TableColumn): boolean {
  if ('children' in column)
    return false
  return (
    !!column.filter && (!!column.filterOptions || !!column.renderFilterMenu)
  )
}

function getNextOrderOf(order: SortOrder): SortOrder {
  if (!order)
    return 'descend'
  else if (order === 'descend')
    return 'ascend'
  return false
}

export function createNextSorter(
  column: TableBaseColumn,
  currentSortState: SortState | null
): SortState | null {
  if (column.sorter === undefined)
    return null
  if (currentSortState === null || currentSortState.columnKey !== column.key) {
    return {
      columnKey: column.key,
      sorter: column.sorter,
      order: getNextOrderOf(false)
    }
  }
  else {
    return {
      ...currentSortState,
      order: getNextOrderOf(currentSortState.order)
    }
  }
}

export function isColumnSorting(
  column: TableColumn,
  mergedSortState: SortState[]
): boolean {
  return (
    mergedSortState.find(
      state =>
        state.columnKey === (column as TableBaseColumn).key && state.order
    ) !== undefined
  )
}

function formatCsvCell(value: unknown): string {
  if (typeof value === 'string') {
    return value.replace(/,/g, '\\,')
  }
  else if (value === null || value === undefined) {
    return ''
  }
  else {
    return `${value}`.replace(/,/g, '\\,')
  }
}

export function generateCsv(columns: TableColumn[], data: RowData[]): string {
  const exportableColumns = columns.filter(
    column =>
      column.type !== 'expand'
      && column.type !== 'selection'
      && column.allowExport !== false
  )
  const header = exportableColumns.map((col: any) => col.title).join(',')
  const rows = data.map((row) => {
    return exportableColumns
      .map((col: any) => formatCsvCell(row[col.key]))
      .join(',')
  })
  return [header, ...rows].join('\n')
}
