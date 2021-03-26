import { TreeNode, TreeMate } from 'treemate'
import { CSSProperties, VNodeChild } from 'vue'
import { EllipsisProps } from '../../ellipsis/src'
import { NLocale } from '../../locales'
import { MergedTheme } from '../../_mixins'
import { DataTableTheme } from '../styles'
import { RowItem, ColItem } from './use-group-header'

export type FilterOptionValue = string | number
export type ColumnKey = string | number
export type RowKey = string | number

export type SortOrderFlag = 1 | -1 | 0

export type CreateRowKey = (row: RowData) => RowKey
export type CreateRowClassName = (row: RowData, index: number) => string

export type Sorter = (row1: RowData, row2: RowData) => number
export type Filter = (
  filterOptionValue: FilterOptionValue,
  row: RowData
) => boolean

export interface FilterOption {
  label: string
  value: FilterOptionValue
}

export interface RowData {
  [key: string]: unknown
  children?: RowData[]
}

export type TmNode = TreeNode<RowData>

// for compat may add null
export type SortOrder = 'ascend' | 'descend' | false

export type Ellipsis = boolean | EllipsisProps

export interface CommonColumnInfo {
  fixed?: 'left' | 'right'
  width?: number
  className?: string
  align?: 'left' | 'center' | 'right'
  ellipsis?: Ellipsis
}

export type TableColumnTitle =
  | string
  | ((column: TableBaseColumn) => VNodeChild)

export type TableExpandColumnTitle =
  | string
  | ((column: TableExpandColumn) => VNodeChild)

export type TableColumnGroupTitle =
  | string
  | ((column: TableColumnGroup) => VNodeChild)

export type TableColumnGroup = {
  title?: TableColumnGroupTitle
  type?: never
  key: ColumnKey
  children: TableBaseColumn[]

  // to suppress type error in table header
  filterOptions?: never
} & CommonColumnInfo

export type TableBaseColumn = {
  title?: TableColumnTitle
  titleColSpan?: number
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

  render?: (rowData: RowData, rowIndex: number) => VNodeChild
  renderFilterMenu?: RenderFilterMenu
  renderSorter?: RenderSorter
  renderFilter?: RenderFilter
  colSpan?: (rowData: RowData, rowIndex: number) => number
  rowSpan?: (rowData: RowData, rowIndex: number) => number
} & CommonColumnInfo

export type TableSelectionColumn = {
  type: 'selection'
  disabled?: (row: RowData) => boolean

  // to suppress type error in utils
  sorter?: never
  filter?: never
  filterOptions?: never
  filterOptionValues?: never
  filterOptionValue?: never
  colSpan?: never
  rowSpan?: never
} & CommonColumnInfo

export type RenderExpand = (row: RowData, index: number) => VNodeChild
export type Expandable = (row: RowData, index: number) => boolean
export interface TableExpandColumn extends Omit<TableSelectionColumn, 'type'> {
  type: 'expand'
  title?: TableExpandColumnTitle
  renderExpand: RenderExpand
  expandable?: Expandable
}

export type TableColumn =
  | TableColumnGroup
  | TableBaseColumn
  | TableSelectionColumn
  | TableExpandColumn
export type TableColumns = TableColumn[]

export interface DataTableInjection {
  mergedTheme: MergedTheme<DataTableTheme>
  scrollX?: string | number
  rows: RowItem[][]
  cols: ColItem[]
  treeMate: TreeMate<RowData>
  paginatedData: TmNode[]
  leftFixedColumns: TableColumns
  rightFixedColumns: TableColumns
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
  mergedExpandedRowKeys: RowKey[]
  renderExpand: undefined | RenderExpand
  doUpdateExpandedRowKeys: (keys: RowKey[]) => void
  rowKey: CreateRowKey | undefined
  doUpdateFilters: (
    filters: FilterState,
    sourceColumn?: TableBaseColumn
  ) => void
  doUpdateSorter: (sorter: SortState | null) => void
  doUpdateCheckedRowKeys: (keys: RowKey[]) => void
  doUncheckAll: (column: TableSelectionColumn) => void
  doCheckAll: (column: TableSelectionColumn) => void
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

export type RenderFilter = (props: {
  active: boolean
  show: boolean
}) => VNodeChild

export type RenderSorter = (props: { order: SortOrder | false }) => VNodeChild

export type RenderFilterMenu = () => VNodeChild

export type OnUpdateExpandedRowKeys = (keys: RowKey[]) => void
export type OnUpdateCheckedRowKeys = (keys: RowKey[]) => void
export type OnUpdateSorter = (sortState: SortState | null) => void
export type OnUpdateFilters = (
  filterState: FilterState,
  sourceColumn?: TableBaseColumn
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

export interface DataTableInst {
  filter: (filters: FilterState | null) => void
  filters: (filters: FilterState | null) => void
  clearFilter: () => void
  clearFilters: () => void
  page: (page: number) => void
  sort: (columnKey: ColumnKey, order: SortOrder) => void
}
