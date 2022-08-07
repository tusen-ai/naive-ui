import { TreeNode } from 'treemate'
import { CSSProperties, Ref, VNodeChild, HTMLAttributes, Slots } from 'vue'
import type { ScrollTo } from '../../scrollbar/src/Scrollbar'
import type { EllipsisProps } from '../../ellipsis/src/Ellipsis'
import type { NLocale } from '../../locales'
import type { MergedTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { DataTableTheme } from '../styles'
import type { RowItem, ColItem } from './use-group-header'
import type { DataTableSelectionOption } from './TableParts/SelectionMenu'

export type FilterOptionValue = string | number
export type ColumnKey = string | number
export type RowKey = string | number

export type SortOrderFlag = 1 | -1 | 0

export type RowData = Record<string, any>

export interface InternalRowData {
  [key: string]: unknown
}

export type CreateRowKey<T = InternalRowData> = (row: T) => RowKey
export type CreateRowClassName<T = InternalRowData> = (
  row: T,
  index: number
) => string
export type CreateRowProps<T = InternalRowData> = (
  row: T,
  index: number
) => HTMLAttributes
export type CreateCellProps<T = InternalRowData> = (
  row: T,
  index: number
) => HTMLAttributes

export type CompareFn<T = InternalRowData> = (row1: T, row2: T) => number
export type Sorter<T = InternalRowData> = CompareFn<T> | SorterMultiple<T>
export interface SorterMultiple<T = InternalRowData> {
  multiple: number
  compare?: CompareFn<T> | 'default'
}

export type Filter<T = InternalRowData> = (
  filterOptionValue: FilterOptionValue,
  row: T
) => boolean

export interface FilterOption {
  label: string
  value: FilterOptionValue
}

export type TmNode = TreeNode<InternalRowData>

// for compat may add null
export type SortOrder = 'ascend' | 'descend' | false

export type Ellipsis = boolean | (EllipsisProps & { style?: CSSProperties })

export interface CommonColumnInfo<T = InternalRowData> {
  fixed?: 'left' | 'right'
  width?: number | string
  minWidth?: number | string
  className?: string
  align?: 'left' | 'center' | 'right'
  ellipsis?: Ellipsis
  cellProps?: (rowData: T, rowIndex: number) => HTMLAttributes
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

export type TableColumnGroup<T = InternalRowData> = {
  title?: TableColumnGroupTitle
  type?: never
  key: ColumnKey
  children: Array<TableBaseColumn<T>>

  // to suppress type error in table header
  filterOptions?: never
} & CommonColumnInfo<T>

export type TableBaseColumn<T = InternalRowData> = {
  title?: TableColumnTitle
  titleColSpan?: number
  // for compat maybe default
  type?: never
  key: ColumnKey

  tree?: boolean

  sorter?: boolean | Sorter<T> | 'default'
  defaultSortOrder?: SortOrder
  sortOrder?: SortOrder // controlled

  filter?: 'default' | boolean | Filter<T>
  filterOptions?: FilterOption[]
  filterOptionValues?: FilterOptionValue[] | null // controlled
  filterOptionValue?: FilterOptionValue | null // controlled
  filterMode?: 'or' | 'and'

  defaultFilterOptionValues?: FilterOptionValue[] | null
  defaultFilterOptionValue?: FilterOptionValue | null
  filterMultiple?: boolean

  render?: (rowData: T, rowIndex: number) => VNodeChild
  renderFilter?: RenderFilter
  renderFilterIcon?: RenderFilterIcon
  renderSorter?: RenderSorter
  renderSorterIcon?: RenderSorterIcon
  renderFilterMenu?: RenderFilterMenu
  colSpan?: (rowData: T, rowIndex: number) => number
  rowSpan?: (rowData: T, rowIndex: number) => number
} & CommonColumnInfo<T>

export type TableSelectionColumn<T = InternalRowData> = {
  type: 'selection'
  multiple?: boolean
  disabled?: (row: T) => boolean
  options?: DataTableSelectionOptions<T>

  // to suppress type error in utils
  sorter?: never
  filter?: never
  filterOptions?: never
  filterOptionValues?: never
  filterOptionValue?: never
  colSpan?: never
  rowSpan?: never
} & CommonColumnInfo<T>

export type RenderExpand<T = InternalRowData> = (
  row: T,
  index: number
) => VNodeChild

// TODO: we should deprecate `index` since it would change after row is expanded
export type Expandable<T = InternalRowData> = (row: T) => boolean
export interface TableExpandColumn<T = InternalRowData>
  extends Omit<TableSelectionColumn<T>, 'type'> {
  type: 'expand'
  title?: TableExpandColumnTitle
  renderExpand: RenderExpand<T>
  expandable?: Expandable<T>
}

export type TableColumn<T = InternalRowData> =
  | TableColumnGroup<T>
  | TableBaseColumn<T>
  | TableSelectionColumn<T>
  | TableExpandColumn<T>
export type TableColumns<T = InternalRowData> = Array<TableColumn<T>>

export type DataTableSelectionOptions<T = InternalRowData> = Array<
| DataTableSelectionOption
| { label: string, key: string | number, onSelect: (pageData: T[]) => void }
>
export interface DataTableInjection {
  slots: Slots
  indentRef: Ref<number>
  childTriggerColIndexRef: Ref<number>
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
  leftActiveFixedChildrenColKeysRef: Ref<ColumnKey[]>
  rightActiveFixedColKeyRef: Ref<ColumnKey | null>
  rightActiveFixedChildrenColKeysRef: Ref<ColumnKey[]>
  fixedColumnLeftMapRef: Ref<
  Record<ColumnKey, { start: number, end: number } | undefined>
  >
  fixedColumnRightMapRef: Ref<
  Record<ColumnKey, { start: number, end: number } | undefined>
  >
  mergedCurrentPageRef: Ref<number>
  someRowsCheckedRef: Ref<boolean>
  allRowsCheckedRef: Ref<boolean>
  mergedSortStateRef: Ref<SortState[]>
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
  rawPaginatedDataRef: Ref<InternalRowData[]>
  virtualScrollRef: Ref<boolean>
  bodyWidthRef: Ref<number | null>
  scrollPartRef: Ref<'head' | 'body'>
  mergedTableLayoutRef: Ref<'auto' | 'fixed'>
  maxHeightRef: Ref<string | number | undefined>
  minHeightRef: Ref<string | number | undefined>
  rowPropsRef: Ref<CreateRowProps | undefined>
  flexHeightRef: Ref<boolean>
  headerCheckboxDisabledRef: Ref<boolean>
  stripedRef: Ref<boolean>
  onLoadRef: Ref<DataTableOnLoad | undefined>
  loadingKeySetRef: Ref<Set<RowKey>>
  paginationBehaviorOnFilterRef: Ref<'current' | 'first'>
  doUpdatePage: (page: number) => void
  doUpdateExpandedRowKeys: (keys: RowKey[]) => void
  doUpdateFilters: (filters: FilterState, sourceColumn: TableBaseColumn) => void
  deriveNextSorter: (sorter: SortState | null) => void
  doUncheckAll: (checkWholeTable?: boolean) => void
  doCheckAll: (checkWholeTable?: boolean) => void
  doCheck: (rowKey: RowKey | RowKey[], single: boolean) => void
  doUncheck: (rowKey: RowKey | RowKey[]) => void
  handleTableHeaderScroll: (e: Event) => void
  handleTableBodyScroll: (e: Event) => void
  syncScrollState: (deltaX?: number, deltaY?: number) => void
  setHeaderScrollLeft: (scrollLeft: number) => void
  renderCell: Ref<
  | undefined
  | ((value: any, rowData: object, column: TableBaseColumn) => VNodeChild)
  >
}

export const dataTableInjectionKey =
  createInjectionKey<DataTableInjection>('n-data-table')

export interface MainTableInjection {
  leftActiveFixedColKey: ColumnKey | null
  rightActiveFixedColKey: ColumnKey | null
}

export type RenderFilter = (props: {
  active: boolean
  show: boolean
}) => VNodeChild

export type RenderFilterIcon = RenderFilter

export type RenderSorter = (props: { order: SortOrder }) => VNodeChild

export type RenderSorterIcon = RenderSorter

export type RenderFilterMenu = (actions: { hide: () => void }) => VNodeChild

export type OnUpdateExpandedRowKeys = (keys: RowKey[]) => void
export type OnUpdateCheckedRowKeys = (
  keys: RowKey[],
  row: InternalRowData[]
) => void

// `null` only occurs when clearSorter is called
export type OnUpdateSorter = (sortState: SortState & SortState[] & null) => void
export type OnUpdateSorterImpl = (
  sortState: SortState | SortState[] | null
) => void
export type OnUpdateFilters = (
  filterState: FilterState,
  sourceColumn: TableBaseColumn
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
  scrollTo: ScrollTo
}

export interface MainTableBodyRef {
  getScrollContainer: () => HTMLElement | null
  scrollTo: ScrollTo
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
  clearFilters: () => void
  clearSorter: () => void
  page: (page: number) => void
  sort: (columnKey: ColumnKey, order: SortOrder) => void
  scrollTo: ScrollTo
  /** @deprecated it but just leave it here, it does no harm */
  clearFilter: () => void
}

export type CreateSummary<T = InternalRowData> = (
  pageData: T[]
) => SummaryRowData | SummaryRowData[]

export interface SummaryCell {
  value?: VNodeChild
  colSpan?: number
  rowSpan?: number
}
export interface SummaryRowData {
  [key: string]: SummaryCell
}

export type DataTableOnLoad = (node: RowData) => Promise<void>
