import {
  h,
  computed,
  defineComponent,
  ref,
  provide,
  PropType,
  ExtractPropTypes,
  toRef,
  CSSProperties
} from 'vue'
import { useConfig, useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NEmpty } from '../../empty'
import { NSpin } from '../../spin'
import { NPagination } from '../../pagination'
import { PaginationProps } from '../../pagination/src/Pagination'
import { warn, createKey } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
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
  TableColumns,
  RowData,
  OnUpdateFilters,
  MainTableRef,
  DataTableInst,
  OnUpdateExpandedRowKeys,
  dataTableInjectionKey,
  CreateSummary
} from './interface'
import style from './styles/index.cssr'
import { useGroupHeader } from './use-group-header'
import { useExpand } from './use-expand'

export const dataTableProps = {
  ...(useTheme.props as ThemeProps<DataTableTheme>),
  pagination: {
    type: [Object, Boolean] as PropType<false | PaginationProps>,
    default: false
  },
  minHeight: Number,
  maxHeight: Number,
  columns: {
    type: Array as PropType<TableColumns>,
    default: () => []
  },
  data: {
    type: Array as PropType<RowData[]>,
    default: () => []
  },
  rowClassName: [String, Function] as PropType<string | CreateRowClassName>,
  rowKey: Function as PropType<CreateRowKey>,
  loading: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  bottomBordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
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
  defaultExpandedRowKeys: {
    type: Array as PropType<RowKey[]>,
    default: []
  },
  expandedRowKeys: Array as PropType<RowKey[]>,
  summary: [Function] as PropType<CreateSummary>,
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
  'onUpdate:expandedRowKeys': [Function, Array] as PropType<
  MaybeArray<OnUpdateExpandedRowKeys>
  >,
  onUpdateExpandedRowKeys: [Function, Array] as PropType<
  MaybeArray<OnUpdateExpandedRowKeys>
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

export type DataTableProps = ExtractPublicPropTypes<typeof dataTableProps>
export type DataTableSetupProps = ExtractPropTypes<typeof dataTableProps>

export default defineComponent({
  name: 'DataTable',
  alias: ['AdvancedTable'],
  props: dataTableProps,
  setup (props) {
    const { mergedBorderedRef, mergedClsPrefixRef } = useConfig(props)
    const mergedBottomBorderedRef = computed(() => {
      const { bottomBordered } = props
      // do not add bottom bordered class if bordered is true
      // since border is displayed on wrapper
      if (mergedBorderedRef.value) return false
      if (bottomBordered !== undefined) return bottomBordered
      return true
    })
    const themeRef = useTheme(
      'DataTable',
      'DataTable',
      style,
      dataTableLight,
      props,
      mergedClsPrefixRef
    )
    const mainTableInstRef = ref<MainTableRef | null>(null)
    const { rowsRef, colsRef, dataRelatedColsRef } = useGroupHeader(props)
    const {
      treeMateRef,
      mergedCurrentPageRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      selectionColumnRef,
      hoverKeyRef,
      mergedPaginationRef,
      mergedFilterStateRef,
      mergedSortStateRef,
      doUpdateFilters,
      doUpdateSorter,
      filter,
      filters,
      clearFilter,
      clearFilters,
      page,
      sort
    } = useTableData(props, { dataRelatedColsRef })
    const {
      doCheckAll,
      doUncheckAll,
      doUpdateCheckedRowKeys,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedCheckedRowKeysRef
    } = useCheck(props, {
      selectionColumnRef,
      treeMateRef,
      paginatedDataRef
    })
    const {
      mergedExpandedRowKeysRef,
      renderExpandRef,
      doUpdateExpandedRowKeys
    } = useExpand(props)
    const {
      handleTableBodyScroll,
      handleTableHeaderScroll,
      deriveActiveRightFixedColumn,
      deriveActiveLeftFixedColumn,
      leftActiveFixedColKeyRef,
      rightActiveFixedColKeyRef,
      leftFixedColumnsRef,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef
    } = useScroll(props, {
      mainTableInstRef,
      mergedCurrentPageRef
    })
    const { localeRef } = useLocale('DataTable')
    provide(dataTableInjectionKey, {
      hoverKeyRef,
      mergedClsPrefixRef,
      treeMateRef,
      mergedThemeRef: themeRef,
      scrollXRef: computed(() => props.scrollX),
      rowsRef,
      colsRef,
      paginatedDataRef,
      leftActiveFixedColKeyRef,
      rightActiveFixedColKeyRef,
      leftFixedColumnsRef,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedSortStateRef,
      mergedFilterStateRef,
      loadingRef: toRef(props, 'loading'),
      rowClassNameRef: toRef(props, 'rowClassName'),
      mergedCheckedRowKeysRef,
      mergedExpandedRowKeysRef,
      localeRef,
      rowKeyRef: toRef(props, 'rowKey'),
      renderExpandRef,
      summaryRef: toRef(props, 'summary'),
      checkOptionsRef: computed(() => {
        const { value: selectionColumn } = selectionColumnRef
        return selectionColumn?.options
      }),
      rawPaginatedDataRef,
      filterMenuCssVarsRef: computed(() => {
        const {
          self: { actionDividerColor, actionPadding, actionButtonMargin }
        } = themeRef.value
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {
          '--action-padding': actionPadding,
          '--action-button-margin': actionButtonMargin,
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
      doUpdateExpandedRowKeys,
      handleTableHeaderScroll,
      handleTableBodyScroll
    })
    const exposedMethods: DataTableInst = {
      filter,
      filters,
      clearFilter,
      clearFilters,
      page,
      sort
    }
    return {
      mainTableInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      paginatedData: paginatedDataRef,
      mergedBordered: mergedBorderedRef,
      mergedBottomBordered: mergedBottomBorderedRef,
      mergedPagination: mergedPaginationRef,
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
            borderColorPopover,
            thColorPopover,
            tdColorPopover,
            tdColorHoverPopover,
            thColorHoverPopover,
            paginationMargin,
            emptyPadding,
            boxShadowAfter,
            boxShadowBefore,
            sorterSize,
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
          '--border-color-popover': borderColorPopover,
          '--th-color': thColor,
          '--th-color-hover': thColorHover,
          '--th-color-modal': thColorModal,
          '--th-color-hover-modal': thColorHoverModal,
          '--th-color-popover': thColorPopover,
          '--th-color-hover-popover': thColorHoverPopover,
          '--td-color': tdColor,
          '--td-color-hover': tdColorHover,
          '--td-color-modal': tdColorModal,
          '--td-color-hover-modal': tdColorHoverModal,
          '--td-color-popover': tdColorPopover,
          '--td-color-hover-popover': tdColorHoverPopover,
          '--th-text-color': thTextColor,
          '--td-text-color': tdTextColor,
          '--th-font-weight': thFontWeight,
          '--th-button-color-hover': thButtonColorHover,
          '--th-icon-color': thIconColor,
          '--th-icon-color-active': thIconColorActive,
          '--filter-size': filterSize,
          '--pagination-margin': paginationMargin,
          '--empty-padding': emptyPadding,
          '--box-shadow-before': boxShadowBefore,
          '--box-shadow-after': boxShadowAfter,
          '--sorter-size': sorterSize
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-data-table`,
          {
            [`${mergedClsPrefix}-data-table--bordered`]: this.mergedBordered,
            [`${mergedClsPrefix}-data-table--bottom-bordered`]: this
              .mergedBottomBordered,
            [`${mergedClsPrefix}-data-table--single-line`]: this.singleLine,
            [`${mergedClsPrefix}-data-table--single-column`]: this.singleColumn
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
              <div class={`${mergedClsPrefix}-data-table-wrapper`}>
                <NMainTable
                  ref="mainTableInstRef"
                  maxHeight={this.maxHeight}
                  minHeight={this.minHeight}
                  bordered={this.mergedBordered}
                >
                  {{
                    default: () =>
                      this.paginatedData.length === 0 ? (
                        <div
                          class={[
                            `${mergedClsPrefix}-data-table-empty`,
                            {
                              [`${mergedClsPrefix}-data-table-empty--hide`]: this
                                .loading
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
                <div class={`${this.mergedClsPrefix}-data-table__pagination`}>
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
