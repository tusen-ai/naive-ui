import { TreeNode, TreeMate } from 'treemate'
import { CSSProperties, VNodeChild } from 'vue'
import { NLocale } from '../../locales'
import { MergedTheme } from '../../_mixins'
import { DataTableTheme } from '../styles'

export type FilterOptionValue = string | number
export type ColumnKey = string | number
export type RowKey = string | number

export type SortOrderFlag = 1 | -1 | 0

export type CreateRowKey = (row: TableNode) => RowKey
export type CreateRowClassName = (row: TableNode, index: number) => string

export type Sorter = (row1: TableNode, row2: TableNode) => number
export type Filter = (
  filterOptionValue: FilterOptionValue,
  row: TableNode
) => boolean

export interface FilterOption {
  label: string
  value: FilterOptionValue
}

export interface TableNode {
  [key: string]: unknown
  children?: TableNode[]
}

export type TmNode = TreeNode<TableNode>

// for compat may add null
export type SortOrder = 'ascend' | 'descend' | false

export interface CommonColInfo {
  fixed?: 'left' | 'right'
  width?: number
  className?: string
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean
}

export type TableColumnInfo = {
  title?: string | ((column: TableColumnInfo, index: number) => VNodeChild)
  // for compat maybe default
  type?: never
  key: ColumnKey

  sorter?: boolean | Sorter | 'default'
  defaultSortOrder?: SortOrder
  sortOrder?: SortOrder // controlled

  filter?: 'default' | boolean | Filter
  filterOptions?: FilterOption[]
  filterOptionValues?: FilterOptionValue[] | null // controlled
  filterOptionValue?: FilterOptionValue | null // controlled
  filterMode?: 'or' | 'and'

  defaultFilterOptionValues?: FilterOptionValue[] | null
  defaultFilterOptionValue?: FilterOptionValue | null
  filterMultiple?: boolean

  // for selection
  render?: (data: TableNode, index: number) => VNodeChild
} & CommonColInfo

export type SelectionColInfo = {
  type: 'selection'
  disabled?: (row: TableNode) => boolean

  // to suppress type error in utils
  sorter?: never
  filter?: never
  filterOptions?: never
  filterOptionValues?: never
  filterOptionValue?: never
} & CommonColInfo

export interface DataTableInjection {
  mergedTheme: MergedTheme<DataTableTheme>
  scrollX?: string | number
  columns: Array<TableColumnInfo | SelectionColInfo>
  treeMate: TreeMate<TableNode>
  paginatedData: TmNode[]
  leftFixedColumns: Array<TableColumnInfo | SelectionColInfo>
  rightFixedColumns: Array<TableColumnInfo | SelectionColInfo>
  leftActiveFixedColKey: ColumnKey | null
  rightActiveFixedColKey: ColumnKey | null
  fixedColumnLeftMap: Record<ColumnKey, number | undefined>
  fixedColumnRightMap: Record<ColumnKey, number | undefined>
  currentPage: number
  someRowsChecked: boolean
  allRowsChecked: boolean
  mergedSortState: SortState | null
  mergedFilterState: FilterState
  loading: boolean
  rowClassName?: string | CreateRowClassName
  mergedCheckedRowKeys: RowKey[]
  locale: NLocale['DataTable']
  filterMenuCssVars: CSSProperties
  renderSorter?: SorterRender
  renderFilter?: FilterRender
  rowKey?: CreateRowKey
  doUpdateFilters: (
    filters: FilterState,
    sourceColumn?: TableColumnInfo
  ) => void
  doUpdateSorter: (sorter: SortState | null) => void
  doUpdateCheckedRowKeys: (keys: RowKey[]) => void
  doUncheckAll: (column: SelectionColInfo) => void
  doCheckAll: (column: SelectionColInfo) => void
  handleTableHeaderScroll: (e: Event) => void
  handleTableBodyScroll: (e: Event) => void
  deriveActiveRightFixedColumn: (
    target: HTMLElement,
    tableWidth: number
  ) => void
  deriveActiveLeftFixedColumn: (target: HTMLElement, tableWidth: number) => void
}

export interface MainTableInjection {
  leftActiveFixedColKey: ColumnKey | null
  rightActiveFixedColKey: ColumnKey | null
}

export type FilterRender = (props: {
  active: boolean
  show: boolean
}) => VNodeChild

export type SorterRender = (props: {
  active: boolean
  order: SortOrder
}) => VNodeChild

export type OnUpdateCheckedRowKeys = (keys: RowKey[]) => void
export type OnUpdateSorter = (sortState: SortState | null) => void
export type OnUpdateFilters = (
  filterState: FilterState,
  sourceColumn?: TableColumnInfo
) => void

export interface SortState {
  columnKey: ColumnKey
  order: SortOrder
  // Sorter    => sync data + functional sorter
  // 'default' => sync data + default sorter
  // true      => async data
  // false     => show nothing
  sorter: Sorter | boolean | 'default'
}

export interface FilterState {
  [key: string]: FilterOptionValue[] | FilterOptionValue | null | undefined
}

export interface MainTableRef {
  getHeaderElement: () => HTMLElement | null
  getBodyElement: () => HTMLElement | null
}

export interface MainTableBodyRef {
  getScrollContainer: () => HTMLElement | null
}

export interface MainTableHeaderRef {
  $el: HTMLElement | null
}

export type OnFilterMenuChange = <
  T extends FilterOptionValue[] & (FilterOptionValue | null)
>(
  value: T
) => void
export type OnFilterMenuChangeImpl = (
  value: FilterOptionValue[] | FilterOptionValue | null
) => void

export interface DataTableRef {
  filter: (filters: FilterState | null) => void
  filters: (filters: FilterState | null) => void
  clearFilter: () => void
  clearFilters: () => void
  page: (page: number) => void
  sort: (columnKey: ColumnKey, order: SortOrder) => void
}
