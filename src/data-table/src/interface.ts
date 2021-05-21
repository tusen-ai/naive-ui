import { TreeNode } from 'treemate'
import { CSSProperties, InjectionKey, Ref, VNodeChild } from 'vue'
import { EllipsisProps } from '../../ellipsis/src/Ellipsis'
import { NLocale } from '../../locales'
import { MergedTheme } from '../../_mixins'
import { DataTableTheme } from '../styles'
import { RowItem, ColItem } from './use-group-header'
import { DataTableSelectionOption } from './TableParts/SelectionMenu'

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
  // children?: RowData[]
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
  renderSorter?: RenderSorter
  renderFilter?: RenderFilter
  renderFilterIcon?: RenderFilter
  renderFilterMenu?: RenderFilterMenu
  colSpan?: (rowData: RowData, rowIndex: number) => number
  rowSpan?: (rowData: RowData, rowIndex: number) => number
} & CommonColumnInfo

export type TableSelectionColumn = {
  type: 'selection'
  disabled?: (row: RowData) => boolean
  options?: DataTableSelectionOptions

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

export type DataTableSelectionOptions = Array<
| DataTableSelectionOption
| { label: string, key: string | number, onSelect: () => void }
>
export interface DataTableInjection {
  indentRef: Ref<number>
  hasChildrenRef: Ref<boolean>
  firstContentfulColIndexRef: Ref<number>
  componentId: string
  checkOptionsRef: Ref<DataTableSelectionOptions | undefined>
  hoverKeyRef: Ref<RowKey | null>
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<DataTableTheme>>
  scrollXRef: Ref<string | number | undefined>
  rowsRef: Ref<RowItem[][]>
  colsRef: Ref<ColItem[]>
  paginatedDataRef: Ref<TmNode[]>
  leftFixedColumnsRef: Ref<TableColumns>
  rightFixedColumnsRef: Ref<TableColumns>
  leftActiveFixedColKeyRef: Ref<ColumnKey | null>
  rightActiveFixedColKeyRef: Ref<ColumnKey | null>
  fixedColumnLeftMapRef: Ref<Record<ColumnKey, number | undefined>>
  fixedColumnRightMapRef: Ref<Record<ColumnKey, number | undefined>>
  mergedCurrentPageRef: Ref<number>
  someRowsCheckedRef: Ref<boolean>
  allRowsCheckedRef: Ref<boolean>
  mergedSortStateRef: Ref<SortState | null>
  mergedFilterStateRef: Ref<FilterState>
  loadingRef: Ref<boolean>
  rowClassNameRef: Ref<string | CreateRowClassName | undefined>
  mergedCheckedRowKeySetRef: Ref<Set<RowKey>>
  mergedInderminateRowKeySetRef: Ref<Set<RowKey>>
  localeRef: Ref<NLocale['DataTable']>
  filterMenuCssVarsRef: Ref<CSSProperties>
  mergedExpandedRowKeysRef: Ref<RowKey[]>
  rowKeyRef: Ref<CreateRowKey | undefined>
  renderExpandRef: Ref<undefined | RenderExpand>
  summaryRef: Ref<undefined | CreateSummary>
  rawPaginatedDataRef: Ref<RowData[]>
  virtualScrollRef: Ref<boolean>
  bodyWidthRef: Ref<number | null>
  scrollPartRef: Ref<'head' | 'body'>
  tableLayoutRef: Ref<'auto' | 'fixed'>
  doUpdateExpandedRowKeys: (keys: RowKey[]) => void
  doUpdateFilters: (
    filters: FilterState,
    sourceColumn?: TableBaseColumn
  ) => void
  doUpdateSorter: (sorter: SortState | null) => void
  doUncheckAll: (checkWholeTable?: boolean) => void
  doCheckAll: (checkWholeTable?: boolean) => void
  doCheck: (rowKey: RowKey) => void
  doUncheck: (rowKey: RowKey) => void
  handleTableHeaderScroll: (e: Event) => void
  handleTableBodyScroll: (e: Event) => void
  syncScrollState: (deltaX?: number, deltaY?: number) => void
  setHeaderScrollLeft: (scrollLeft: number) => void
}

export const dataTableInjectionKey: InjectionKey<DataTableInjection> = Symbol(
  'dataTable'
)

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

export type CreateSummary = (
  pageData: RowData[]
) => SummaryRowData | SummaryRowData[]

export interface SummaryCell {
  value?: string | number
  colSpan?: number
  rowSpan?: number
}
export interface SummaryRowData {
  [key: string]: SummaryCell
}
