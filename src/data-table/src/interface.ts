import { TreeMate, TreeNode } from 'treemate'
import {
  CSSProperties,
  Ref,
  HTMLAttributes,
  Slots,
  PropType,
  ExtractPropTypes,
  VNodeChild
} from 'vue'
import type { ScrollbarProps, ScrollTo } from '../../scrollbar/src/Scrollbar'
import type { EllipsisProps } from '../../ellipsis/src/Ellipsis'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import type { NLocale } from '../../locales'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import { useTheme } from '../../_mixins'
import { createInjectionKey } from '../../_utils'
import type { PaginationProps } from '../../pagination'
import type { DataTableTheme } from '../styles'
import type { RowItem, ColItem } from './use-group-header'
import { BaseLoadingExposedProps } from '../../_internal'

export const dataTableProps = {
  ...(useTheme.props as ThemeProps<DataTableTheme>),
  onUnstableColumnResize: Function as PropType<
  (
    resizedWidth: number,
    limitedWidth: number,
    column: TableBaseColumn,
    getColumnWidth: (key: ColumnKey) => number | undefined
  ) => void
  >,
  pagination: {
    type: [Object, Boolean] as PropType<false | PaginationProps>,
    default: false
  },
  paginateSinglePage: {
    type: Boolean,
    default: true
  },
  minHeight: [Number, String] as PropType<string | number>,
  maxHeight: [Number, String] as PropType<string | number>,
  // Use any type as row data to make prop data acceptable
  columns: {
    type: Array as PropType<TableColumns<any>>,
    default: () => []
  },
  rowClassName: [String, Function] as PropType<
  string | CreateRowClassName<any>
  >,
  rowProps: Function as PropType<CreateRowProps<any>>,
  rowKey: Function as PropType<CreateRowKey<any>>,
  summary: [Function] as PropType<CreateSummary<any>>,
  summaryHeader: [Function] as PropType<CreateSummary<any>>,
  data: {
    type: Array as PropType<RowData[]>,
    default: () => []
  },
  loading: Boolean,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  bottomBordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  striped: Boolean,
  scrollX: [Number, String] as PropType<string | number>,
  defaultCheckedRowKeys: {
    type: Array as PropType<RowKey[]>,
    default: () => []
  },
  checkedRowKeys: Array as PropType<RowKey[]>,
  singleLine: {
    type: Boolean,
    default: true
  },
  singleColumn: Boolean,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  remote: Boolean,
  defaultExpandedRowKeys: {
    type: Array as PropType<RowKey[]>,
    default: []
  },
  defaultExpandAll: Boolean,
  expandedRowKeys: Array as PropType<RowKey[]>,
  stickyExpandedRows: Boolean,
  virtualScroll: Boolean,
  tableLayout: {
    type: String as PropType<'auto' | 'fixed'>,
    default: 'auto'
  },
  allowCheckingNotLoaded: Boolean,
  cascade: {
    type: Boolean,
    default: true
  },
  childrenKey: {
    type: String,
    default: 'children'
  },
  indent: {
    type: Number,
    default: 16
  },
  flexHeight: Boolean,
  summaryPlacement: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'bottom'
  },
  paginationBehaviorOnFilter: {
    type: String as PropType<'first' | 'current'>,
    default: 'current'
  },
  scrollbarProps: Object as PropType<ScrollbarProps>,
  renderCell: Function as PropType<
  (value: any, rowData: object, column: TableBaseColumn) => VNodeChild
  >,
  renderExpandIcon: Function as PropType<RenderExpandIcon>,
  spinProps: { type: Object as PropType<BaseLoadingExposedProps>, default: {} },
  onLoad: Function as PropType<DataTableOnLoad>,
  'onUpdate:page': [Function, Array] as PropType<
  PaginationProps['onUpdate:page']
  >,
  onUpdatePage: [Function, Array] as PropType<PaginationProps['onUpdate:page']>,
  'onUpdate:pageSize': [Function, Array] as PropType<
  PaginationProps['onUpdate:pageSize']
  >,
  onUpdatePageSize: [Function, Array] as PropType<
  PaginationProps['onUpdate:pageSize']
  >,
  'onUpdate:sorter': [Function, Array] as PropType<MaybeArray<OnUpdateSorter>>,
  onUpdateSorter: [Function, Array] as PropType<MaybeArray<OnUpdateSorter>>,
  'onUpdate:filters': [Function, Array] as PropType<
  MaybeArray<OnUpdateFilters>
  >,
  onUpdateFilters: [Function, Array] as PropType<MaybeArray<OnUpdateFilters>>,
  'onUpdate:checkedRowKeys': [Function, Array] as PropType<
  MaybeArray<OnUpdateCheckedRowKeys>
  >,
  onUpdateCheckedRowKeys: [Function, Array] as PropType<
  MaybeArray<OnUpdateCheckedRowKeys>
  >,
  'onUpdate:expandedRowKeys': [Function, Array] as PropType<
  MaybeArray<OnUpdateExpandedRowKeys>
  >,
  onUpdateExpandedRowKeys: [Function, Array] as PropType<
  MaybeArray<OnUpdateExpandedRowKeys>
  >,
  onScroll: Function as PropType<(e: Event) => void>,
  // deprecated
  onPageChange: [Function, Array] as PropType<PaginationProps['onUpdate:page']>,
  onPageSizeChange: [Function, Array] as PropType<
  PaginationProps['onUpdate:pageSize']
  >,
  onSorterChange: [Function, Array] as PropType<
  MaybeArray<OnUpdateSorter> | undefined
  >,
  onFiltersChange: [Function, Array] as PropType<
  MaybeArray<OnUpdateFilters> | undefined
  >,
  onCheckedRowKeysChange: [Function, Array] as PropType<
  MaybeArray<OnUpdateCheckedRowKeys> | undefined
  >
} as const

export type FilterOptionValue = string | number
export type ColumnKey = string | number
export type RowKey = string | number

export type SortOrderFlag = 1 | -1 | 0

export type RowData = Record<string, any>

export type InternalRowData = Record<string, unknown>

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
  maxWidth?: number | string
  className?: string
  align?: 'left' | 'center' | 'right'
  titleAlign?: 'left' | 'center' | 'right'
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
  resizable?: boolean
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

  resizable?: boolean
  minWidth?: string | number
  maxWidth?: string | number

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
  resizable?: boolean
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
export type RenderExpandIcon = ({
  expanded
}: {
  expanded: boolean
}) => VNodeChild

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
  props: DataTableSetupProps
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
  summaryHeaderRef: Ref<undefined | CreateSummary>
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
  expandableRef: Ref<Expandable<any> | undefined>
  stickyExpandedRowsRef: Ref<boolean>
  renderExpandIconRef: Ref<undefined | RenderExpandIcon>
  summaryPlacementRef: Ref<'top' | 'bottom'>
  treeMateRef: Ref<TreeMate<InternalRowData, InternalRowData, InternalRowData>>
  scrollbarPropsRef: Ref<ScrollbarProps | undefined>
  doUpdatePage: (page: number) => void
  doUpdateExpandedRowKeys: (keys: RowKey[]) => void
  doUpdateFilters: (filters: FilterState, sourceColumn: TableBaseColumn) => void
  onUnstableColumnResize: (
    resizedWidth: number,
    limitedWidth: number,
    column: TableBaseColumn,
    getColumnWidth: (key: ColumnKey) => number | undefined
  ) => void
  getResizableWidth: (key: ColumnKey) => number | undefined
  clearResizableWidth: () => void
  doUpdateResizableWidth: (column: TableColumn, width: number) => void
  deriveNextSorter: (sorter: SortState | null) => void
  doUncheckAll: (checkWholeTable?: boolean) => void
  doCheckAll: (checkWholeTable?: boolean) => void
  doCheck: (
    rowKey: RowKey | RowKey[],
    single: boolean,
    rowInfo: RowData
  ) => void
  doUncheck: (rowKey: RowKey | RowKey[], rowInfo: RowData) => void
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
  rows: InternalRowData[],
  meta: {
    row: InternalRowData | undefined
    action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll'
  }
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

export type FilterState = Record<
string,
FilterOptionValue[] | FilterOptionValue | null | undefined
>

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
export type SummaryRowData = Record<string, SummaryCell>

export type DataTableOnLoad = (node: RowData) => Promise<void>

export type DataTableSelectionOption = 'all' | 'none'

export type DataTableProps = ExtractPublicPropTypes<typeof dataTableProps>
export type DataTableSetupProps = ExtractPropTypes<typeof dataTableProps>
