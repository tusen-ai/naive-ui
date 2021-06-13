import { TreeNode } from 'treemate'
import {
  CSSProperties,
  InjectionKey,
  Ref,
  VNodeChild,
  HTMLAttributes
} from 'vue'
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

export type Sorter<T = InternalRowData> = (row1: T, row2: T) => number
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

export type TableColumnGroup<T = InternalRowData> = {
  title?: TableColumnGroupTitle
  type?: never
  key: ColumnKey
  children: Array<TableBaseColumn<T>>

  // to suppress type error in table header
  filterOptions?: never
} & CommonColumnInfo

export type TableBaseColumn<T = InternalRowData> = {
  title?: TableColumnTitle
  titleColSpan?: number
  // for compat maybe default
  type?: never
  key: ColumnKey

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
  renderSorter?: RenderSorter
  renderFilter?: RenderFilter
  renderFilterIcon?: RenderFilter
  renderFilterMenu?: RenderFilterMenu
  colSpan?: (rowData: T, rowIndex: number) => number
  rowSpan?: (rowData: T, rowIndex: number) => number
} & CommonColumnInfo

export type TableSelectionColumn<T = InternalRowData> = {
  type: 'selection'
  disabled?: (row: T) => boolean
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

export type RenderExpand<T = InternalRowData> = (
  row: T,
  index: number
) => VNodeChild
export type Expandable<T = InternalRowData> = (row: T, index: number) => boolean
export interface TableExpandColumn<T = InternalRowData>
  extends Omit<TableSelectionColumn<T>, 'type'> {
  type: 'expand'
  title?: TableExpandColumnTitle
  renderExpand: RenderExpand<T>
  expandable?: Expandable<T>
}

export type TableColumn<T = InternalRowData> =
  | TableColumnGroup
  | TableBaseColumn<T>
  | TableSelectionColumn<T>
  | TableExpandColumn<T>
export type TableColumns<T = InternalRowData> = Array<TableColumn<T>>

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
  rawPaginatedDataRef: Ref<InternalRowData[]>
  virtualScrollRef: Ref<boolean>
  bodyWidthRef: Ref<number | null>
  scrollPartRef: Ref<'head' | 'body'>
  tableLayoutRef: Ref<'auto' | 'fixed'>
  maxHeightRef: Ref<string | number | undefined>
  minHeightRef: Ref<string | number | undefined>
  rowPropsRef: Ref<CreateRowProps | undefined>
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

export const dataTableInjectionKey: InjectionKey<DataTableInjection> =
  Symbol('dataTable')

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

export type CreateSummary<T = InternalRowData> = (
  pageData: T[]
) => SummaryRowData | SummaryRowData[]

export interface SummaryCell {
  value?: string | number
  colSpan?: number
  rowSpan?: number
}
export interface SummaryRowData {
  [key: string]: SummaryCell
}
