import {
  h,
  computed,
  defineComponent,
  ref,
  provide,
  PropType,
  ExtractPropTypes,
  reactive,
  toRef,
  CSSProperties
} from 'vue'
import { useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NEmpty } from '../../empty'
import { NSpin } from '../../spin'
import { NPagination } from '../../pagination'
import { PaginationProps } from '../../pagination/src/Pagination'
import { warn, createKey, MaybeArray } from '../../_utils'
import { dataTableLight, DataTableTheme } from '../styles'
import NMainTable from './MainTable'
import { useCheck } from './use-check'
import { useTableData } from './use-table-data'
import { useScroll } from './use-scroll'
import {
  CreateRowClassName,
  CreateRowKey,
  OnUpdateCheckedRowKeys,
  OnUpdateSorter,
  RowKey,
  TableColumnInfo,
  TableNode,
  OnUpdateFilters,
  MainTableRef,
  DataTableInjection,
  DataTableRef,
  SelectionColInfo
} from './interface'
import style from './styles/index.cssr'

export const dataTableProps = {
  ...(useTheme.props as ThemeProps<DataTableTheme>),
  pagination: {
    type: [Object, Boolean] as PropType<false | PaginationProps>,
    default: false
  },
  minHeight: Number,
  maxHeight: Number,
  columns: {
    type: Array as PropType<Array<TableColumnInfo | SelectionColInfo>>,
    required: true
  },
  data: {
    type: Array as PropType<TableNode[]>,
    default: () => []
  },
  rowClassName: [String, Function] as PropType<string | CreateRowClassName>,
  rowKey: Function as PropType<CreateRowKey>,
  loading: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: true
  },
  scrollX: [Number, String] as PropType<string | number>,
  defaultCheckedRowKeys: {
    type: Array as PropType<RowKey[]>,
    default: () => []
  },
  checkedRowKeys: {
    type: Array as PropType<RowKey[]>,
    default: undefined
  },
  singleLine: {
    type: Boolean,
    default: true
  },
  singleColumn: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  remote: Boolean,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:page': [Function, Array] as PropType<
  PaginationProps['onUpdate:page']
  >,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:pageSize': [Function, Array] as PropType<
  PaginationProps['onUpdate:pageSize']
  >,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:sorter': [Function, Array] as PropType<MaybeArray<OnUpdateSorter>>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:filters': [Function, Array] as PropType<
  MaybeArray<OnUpdateFilters>
  >,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:checkedRowKeys': [Function, Array] as PropType<
  MaybeArray<OnUpdateCheckedRowKeys>
  >,
  // deprecated
  onPageChange: {
    type: [Function, Array] as PropType<PaginationProps['onUpdate:page']>,
    validator: () => {
      if (__DEV__) {
        warn(
          'data-table',
          '`on-page-change` is deprecated, please use `on-update:page` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  onPageSizeChange: {
    type: [Function, Array] as PropType<PaginationProps['onUpdate:pageSize']>,
    validator: () => {
      if (__DEV__) {
        warn(
          'data-table',
          '`on-page-size-change` is deprecated, please use `on-update:page-size` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  onSorterChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateSorter> | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'data-table',
          '`on-sorter-change` is deprecated, please use `on-update:sorter` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  onFiltersChange: {
    type: [Function, Array] as PropType<
    MaybeArray<OnUpdateFilters> | undefined
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'data-table',
          '`on-filters-change` is deprecated, please use `on-update:filters` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  onCheckedRowKeysChange: {
    type: [Function, Array] as PropType<
    MaybeArray<OnUpdateCheckedRowKeys> | undefined
    >,
    validator: () => {
      if (__DEV__) {
        warn(
          'data-table',
          '`on-checked-row-keys-change` is deprecated, please use `on-update:checked-row-keys` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type DataTableProps = ExtractPropTypes<typeof dataTableProps>

export default defineComponent({
  name: 'DataTable',
  alias: ['AdvancedTable'],
  props: dataTableProps,
  setup (props) {
    const themeRef = useTheme(
      'DataTable',
      'DataTable',
      style,
      dataTableLight,
      props
    )
    const mainTableInstRef = ref<MainTableRef | null>(null)
    const {
      treeMate: treeMateRef,
      mergedCurrentPage: mergedCurrentPageRef,
      paginatedData: paginatedDataRef,
      currentPage,
      mergedPagination,
      mergedFilterState,
      mergedSortState,
      doUpdateFilters,
      doUpdateSorter,
      filter,
      filters,
      clearFilter,
      clearFilters,
      page,
      sort
    } = useTableData(props)
    const {
      doCheckAll,
      doUncheckAll,
      doUpdateCheckedRowKeys,
      someRowsChecked,
      allRowsChecked,
      mergedCheckedRowKeys
    } = useCheck(props, {
      paginatedDataRef,
      treeMateRef
    })
    const {
      handleTableBodyScroll,
      handleTableHeaderScroll,
      deriveActiveRightFixedColumn,
      deriveActiveLeftFixedColumn,
      leftActiveFixedColKey,
      rightActiveFixedColKey,
      leftFixedColumns,
      rightFixedColumns,
      fixedColumnLeftMap,
      fixedColumnRightMap
    } = useScroll(props, {
      mainTableInstRef,
      mergedCurrentPageRef
    })
    const { locale } = useLocale('DataTable')
    provide<DataTableInjection>(
      'NDataTable',
      reactive({
        treeMate: treeMateRef,
        mergedTheme: themeRef,
        scrollX: computed(() => props.scrollX),
        columns: toRef(props, 'columns'),
        paginatedData: paginatedDataRef,
        leftActiveFixedColKey,
        rightActiveFixedColKey,
        leftFixedColumns,
        rightFixedColumns,
        fixedColumnLeftMap,
        fixedColumnRightMap,
        currentPage,
        someRowsChecked,
        allRowsChecked,
        mergedSortState,
        mergedFilterState,
        loading: toRef(props, 'loading'),
        rowClassName: toRef(props, 'rowClassName'),
        mergedCheckedRowKeys,
        locale,
        rowKey: toRef(props, 'rowKey'),
        filterMenuCssVars: computed(() => {
          const {
            self: { actionDividerColor }
          } = themeRef.value
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          return {
            '--action-divider-color': actionDividerColor
          } as CSSProperties
        }),
        deriveActiveRightFixedColumn,
        deriveActiveLeftFixedColumn,
        doUpdateFilters,
        doUpdateSorter,
        doUpdateCheckedRowKeys,
        doCheckAll,
        doUncheckAll,
        handleTableHeaderScroll,
        handleTableBodyScroll
      })
    )
    const exposedMethods: DataTableRef = {
      filter,
      filters,
      clearFilter,
      clearFilters,
      page,
      sort
    }
    return {
      mainTableInstRef,
      mergedTheme: themeRef,
      paginatedData: paginatedDataRef,
      mergedPagination,
      ...exposedMethods,
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderColor,
            tdColorHover,
            thColor,
            thColorHover,
            tdColor,
            tdTextColor,
            thTextColor,
            thFontWeight,
            thButtonColorHover,
            thIconColor,
            thIconColorActive,
            filterSize,
            borderRadius,
            lineHeight,
            tdColorModal,
            thColorModal,
            borderColorModal,
            thColorHoverModal,
            tdColorHoverModal,
            [createKey('fontSize', size)]: fontSize,
            [createKey('thPadding', size)]: thPadding,
            [createKey('tdPadding', size)]: tdPadding
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--th-padding': thPadding,
          '--td-padding': tdPadding,
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--line-height': lineHeight,
          '--border-color': borderColor,
          '--border-color-modal': borderColorModal,
          '--th-color': thColor,
          '--th-color-hover': thColorHover,
          '--th-color-modal': thColorModal,
          '--th-color-hover-modal': thColorHoverModal,
          '--td-color': tdColor,
          '--td-color-hover': tdColorHover,
          '--td-color-modal': tdColorModal,
          '--td-color-hover-modal': tdColorHoverModal,
          '--th-text-color': thTextColor,
          '--td-text-color': tdTextColor,
          '--th-font-weight': thFontWeight,
          '--th-button-color-hover': thButtonColorHover,
          '--th-icon-color': thIconColor,
          '--th-icon-color-active': thIconColorActive,
          '--filter-size': filterSize
        }
      })
    }
  },
  render () {
    return (
      <div
        class={[
          'n-data-table',
          {
            'n-data-table--bordered': this.bordered,
            'n-data-table--single-line': this.singleLine,
            'n-data-table--single-column': this.singleColumn
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <NSpin
          show={this.loading}
          theme={this.mergedTheme.peers.Spin}
          themeOverrides={this.mergedTheme.peerOverrides.Spin}
          size="small"
        >
          {{
            default: () => [
              <div class="n-data-table-wrapper">
                <NMainTable
                  ref="mainTableInstRef"
                  maxHeight={this.maxHeight}
                  minHeight={this.minHeight}
                  bordered={this.bordered}
                >
                  {{
                    default: () =>
                      this.paginatedData.length === 0 ? (
                        <div
                          class={[
                            'n-data-table-empty',
                            {
                              'n-data-table-empty--hide': this.loading
                            }
                          ]}
                        >
                          <NEmpty
                            theme={this.mergedTheme.peers.Empty}
                            themeOverrides={
                              this.mergedTheme.peerOverrides.Empty
                            }
                          />
                        </div>
                      ) : null
                  }}
                </NMainTable>
              </div>,
              this.pagination ? (
                <div class="n-data-table__pagination">
                  <NPagination
                    theme={this.mergedTheme.peers.Pagination}
                    themeOverrides={this.mergedTheme.peerOverrides.Pagination}
                    {...this.mergedPagination}
                  />
                </div>
              ) : null
            ]
          }}
        </NSpin>
      </div>
    )
  }
})
