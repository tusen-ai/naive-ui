<template>
  <div
    class="n-data-table"
    :class="{
      'n-data-table--bordered': bordered,
      'n-data-table--single-line': singleLine,
      'n-data-table--single-column': singleColumn,
      [`n-data-table--${size}-size`]: true
    }"
    :style="cssVars"
  >
    <n-spin :show="loading" :theme="'light'">
      <div class="n-data-table-wrapper">
        <base-table
          ref="mainTableRef"
          main
          :scroll-x="styleScrollX"
          :max-height="maxHeight"
          :min-height="minHeight"
          :data="paginatedData"
          :columns="normalizedColumns"
          :row-class-name="rowClassName"
          :loading="loading"
          :bordered="bordered"
        >
          <div
            v-if="paginatedData.length === 0"
            class="n-data-table-empty"
            :class="{
              'n-data-table-empty--hide': loading
            }"
          >
            <n-empty :theme="'light'" />
          </div>
        </base-table>
      </div>
      <div v-if="pagination" class="n-data-table__pagination">
        <n-pagination
          :theme="'light'"
          :page="mergedPagination.page"
          :page-count="mergedPagination.pageCount"
          :page-size="mergedPagination.pageSize"
          :page-slot="pagination.pageSlot"
          :page-sizes="pagination.pageSizes"
          :show-size-picker="pagination.showSizePicker"
          :show-quick-jumper="!!pagination.showQuickJumper"
          :disabled="!!pagination.disabled"
          :on-change="mergedOnPageChange"
          :on-page-size-change="mergedOnPageSizeChange"
        />
      </div>
    </n-spin>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { nextFrame } from 'seemly'
import { isPlainObject } from 'lodash-es'
import { useLocale, useTheme } from '../../_mixins'
import BaseTable from './BaseTable.vue'
import { NEmpty } from '../../empty'
import { NPagination } from '../../pagination'
import { warn, call, formatLength, createKey } from '../../_utils'
import { dataTableLight } from '../styles'
import { setCheckStatusOfRow, createRowKey } from './utils'
import style from './styles/index.cssr.js'

function createShallowClonedObject (object) {
  if (!object) return object
  if (typeof object === 'object') {
    return Object.assign({}, object)
  }
  return object
}

function getFlagOfOrder (order) {
  if (order === 'ascend') return 1
  else if (order === 'descend') return -1
  return 0
}

function normalizeColumn (column) {
  const defaultColumn = {
    type: 'default',
    align: 'left',
    ellipsis: false,
    className: null,
    title: null,
    key: undefined,

    sorter: false,
    defaultSortOrder: false,
    sortOrder: null, // controlled

    filter: false,
    filterOptions: [],
    filterOptionValues: undefined, // controlled
    filterOptionValue: undefined, // controlled
    filterMode: 'or',

    /** it is undefined due to compatibility */
    defaultFilterOptionValues: undefined,
    defaultFilterOptionValue: null,
    filterMultiple: true,
    width: null
  }
  Object.keys(column).forEach((key) => {
    if (column[key] !== undefined) {
      defaultColumn[key] = column[key]
    }
  })
  if (!column.key && column.type === 'selection') {
    defaultColumn.key = 'selection'
    defaultColumn.width = 40
  }
  return defaultColumn
}

export default defineComponent({
  name: 'DataTable',
  alias: ['AdvancedTable'],
  components: {
    BaseTable,
    NEmpty,
    NPagination
  },
  provide () {
    return {
      NDataTable: this
    }
  },
  props: {
    ...useTheme.props,
    pagination: {
      type: [Object, Boolean],
      default: false
    },
    minHeight: {
      type: [Number, String],
      default: null
    },
    maxHeight: {
      type: [Number, String],
      default: null
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    rowClassName: {
      type: [String, Function],
      default: ''
    },
    rowKey: {
      type: Function,
      default: null
    },
    loading: {
      type: [Boolean],
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    },
    scrollX: {
      type: [Number, String],
      default: null
    },
    defaultCheckedRowKeys: {
      type: Array,
      default: () => []
    },
    checkedRowKeys: {
      type: Array,
      default: null
    },
    paging: {
      type: Boolean,
      default: true
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
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    },
    renderFilter: {
      type: Function,
      default: undefined
    },
    renderSorter: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:page': {
      type: [Function, Array],
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:pageSize': {
      type: [Function, Array],
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:sorter': {
      type: [Function, Array],
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:filters': {
      type: [Function, Array],
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:checkedRowKeys': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onPageChange: {
      validator () {
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
      validator () {
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
      validator () {
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
      validator () {
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
      validator () {
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
  },
  setup (props) {
    const themeRef = useTheme(
      'DataTable',
      'DataTable',
      style,
      dataTableLight,
      props
    )
    return {
      ...useLocale('DataTable'),
      mainTableRef: ref(null),
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
  data () {
    return {
      /* which part is being scrolling: main left right header */
      scrollingPart: null,
      scrollReceived: false,
      /** internal checked rows */
      internalCheckedRowKeys: [],
      /** internal filters state */
      internalActiveFilters: {},
      /** internal sorter state */
      internalActiveSorter: null,
      /** internal pagination state */
      internalCurrentPage: 1,
      internalPageSize: 10
    }
  },
  computed: {
    styleScrollX () {
      return formatLength(this.scrollX)
    },
    currentFixedColumnLeft () {
      return (column) => {
        const index = this.leftFixedColumns.indexOf(column)
        if (index < 0) {
          return
        }
        let left = 0
        for (let i = 0; i < index; i++) {
          left = left + this.leftFixedColumns[i].width
        }
        return left + 'px'
      }
    },
    currentFixedColumnRight () {
      return (column) => {
        const index = this.rightFixedColumns.indexOf(column)
        if (index < 0) {
          return
        }
        let right = 0
        for (let i = this.rightFixedColumns.length - 1; i > index; i--) {
          right = right + this.rightFixedColumns[i].width
        }
        return right + 'px'
      }
    },
    normalizedColumns () {
      return this.columns.map((column) => normalizeColumn(column))
    },
    leftFixedColumns () {
      return this.normalizedColumns.filter((column) => column.fixed === 'left')
    },
    rightFixedColumns () {
      return this.normalizedColumns.filter((column) => column.fixed === 'right')
    },
    filteredData () {
      const mergedActiveFilters = this.mergedActiveFilters
      const normalizedColumns = this.normalizedColumns
      function createDefaultFilter (columnKey) {
        return (filterOptionValue, row) =>
          ~String(row[columnKey]).indexOf(String(filterOptionValue))
      }
      const data = this.data
      return data
        ? data.filter((row) => {
          for (const columnKey of Object.keys(row)) {
            let activeFilterOptionValues = mergedActiveFilters[columnKey]
            if (activeFilterOptionValues == null) continue
            if (!activeFilterOptionValues.length) continue
            if (!Array.isArray(activeFilterOptionValues)) {
              activeFilterOptionValues = [activeFilterOptionValues]
            }
            const columnToFilter = normalizedColumns.find(
              (column) => column.key === columnKey
            )
            /**
               * When async, filter won't be set, so data won't be filtered
               */
            const filter =
                columnToFilter.filter === 'default'
                  ? createDefaultFilter(columnKey)
                  : columnToFilter.filter
            if (columnToFilter && typeof filter === 'function') {
              if (columnToFilter.filterMode === 'and') {
                if (
                  activeFilterOptionValues.some(
                    (filterOptionValue) => !filter(filterOptionValue, row)
                  )
                ) {
                  return false
                }
              } else {
                if (
                  activeFilterOptionValues.some((filterOptionValue) =>
                    filter(filterOptionValue, row)
                  )
                ) {
                  continue
                } else {
                  return false
                }
              }
            }
          }
          return true
        })
        : []
    },
    mergedCheckedRowKeys () {
      if (this.checkedRowKeys !== null) return this.checkedRowKeys
      return this.internalCheckedRowKeys
    },
    mergedActiveFilters () {
      const columnsWithControlledFilter = this.normalizedColumns.filter(
        (column) => {
          return (
            column.filterOptionValues !== undefined ||
            column.filterOptionValue !== undefined
          )
        }
      )
      const controlledActiveFilters = {}
      columnsWithControlledFilter.forEach((column) => {
        controlledActiveFilters[column.key] =
          column.filterOptionValues || column.filterOptionValue || null
      })
      const activeFilters = Object.assign(
        createShallowClonedObject(this.internalActiveFilters),
        controlledActiveFilters
      )
      return activeFilters
    },
    mergedActiveSorter () {
      /**
       * If one of the columns's sort order is false or 'ascend' or 'descend',
       * the table's controll functionality should work in controlled manner.
       */
      const columnsWithControlledSortOrder = this.normalizedColumns.filter(
        (column) =>
          column.sortOrder === false ||
          column.sortOrder === 'ascend' ||
          column.sortOrder === 'descend'
      )
      const columnToSort = columnsWithControlledSortOrder.find(
        (column) => column.sortOrder
      )
      if (columnToSort) {
        return {
          columnKey: columnToSort.key,
          order: columnToSort.sortOrder,
          sorter: columnToSort.sorter
        }
      }
      if (columnsWithControlledSortOrder.length) return null
      return this.internalActiveSorter
    },
    mergedPageSize () {
      return this.pagination.pageSize || this.internalPageSize
    },
    mergedCurrentPage () {
      return this.pagination.page || this.internalCurrentPage
    },
    mergedPagination () {
      if (!this.pagination) return null
      return {
        ...this.pagination,
        /**
         * writing merged props after pagination to avoid
         * pagination[key] === undefined
         * key still exists but value is undefined
         */
        page: this.mergedCurrentPage,
        pageSize: this.mergedPageSize,
        pageCount: this.mergedPageCount
      }
    },
    mergedOnPageChange () {
      return (page) => {
        this.pagination.onChange && this.pagination.onChange(page)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.internalCurrentPage = page
        this.doUpdatePage(page)
      }
    },
    mergedOnPageSizeChange () {
      return (pageSize) => {
        this.pagination.onPageSizeChange &&
          this.pagination.onPageSizeChange(pageSize)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.internalPageSize = pageSize
        this.doUpdatePageSize(pageSize)
      }
    },
    mergedPageCount () {
      if (this.pagination.pageCount) return this.pagination.pageCount
      if (this.filteredData.length === 0) return 1
      const { pageSize } = this.pagination
      return Math.ceil(this.filteredData.length / pageSize)
    },
    sortedData () {
      const activeSorter = this.mergedActiveSorter
      if (activeSorter) {
        /**
         * When async, mergedActiveSorter.sorter should be true
         * If want use default sorter, mergedActiveSorter.sorter should be 'default'
         */
        if (
          activeSorter.sorter === true ||
          (typeof activeSorter.sorter !== 'function' &&
            activeSorter.sorter !== 'default')
        ) {
          return this.filteredData
        }
        const filteredData = this.filteredData.slice(0)
        const columnKey = activeSorter.columnKey
        /**
         * 1 for asc
         * -1 for desc
         */
        const order = activeSorter.order
        const sorter =
          activeSorter.sorter === 'default'
            ? (row1, row2) => {
              const value1 = row1[columnKey]
              const value2 = row2[columnKey]
              if (typeof value1 === 'number' && typeof value2 === 'number') {
                return value1 - value2
              } else if (
                typeof value1 === 'string' &&
                  typeof value2 === 'string'
              ) {
                return value1.localeCompare(value2)
              }
              return 0
            }
            : activeSorter.sorter
        return filteredData.sort(
          (row1, row2) => getFlagOfOrder(order) * sorter(row1, row2)
        )
      }
      return this.filteredData
    },
    paginatedData () {
      if (!this.pagination) return this.sortedData
      if (!this.paging) return this.sortedData
      const pageSize = this.mergedPageSize
      const startIndex = (this.internalCurrentPage - 1) * pageSize
      return this.sortedData.slice(startIndex, startIndex + pageSize)
    },
    countOfCurrentPageCheckedRows () {
      const checkedRowKeys = this.mergedCheckedRowKeys
      const rowKey = this.rowKey
      return this.paginatedData.reduce((total, row) => {
        const key = createRowKey(row, rowKey)
        return total + (checkedRowKeys.includes(key) ? 1 : 0)
      }, 0)
    },
    someRowsChecked () {
      return (
        this.countOfCurrentPageCheckedRows > 0 &&
        this.countOfCurrentPageCheckedRows < this.paginatedData.length
      )
    },
    allRowsChecked () {
      return this.countOfCurrentPageCheckedRows === this.paginatedData.length
    }
  },
  watch: {
    mergedCurrentPage () {
      this.scrollMainTableBodyToTop()
    }
  },
  created () {
    this.normalizedColumns.forEach((column) => {
      if (
        column.sorter &&
        (column.defaultSortOrder === 'ascend' ||
          column.defaultSortOrder === 'descend')
      ) {
        this.internalActiveSorter = {
          columnKey: column.key,
          sorter: column.sorter,
          order: column.defaultSortOrder
        }
      }
      if (column.filter) {
        const defaultFilterOptionValues = column.defaultFilterOptionValues
        if (column.filterMultiple) {
          this.internalActiveFilters[column.key] =
            defaultFilterOptionValues || []
        } else if (defaultFilterOptionValues !== undefined) {
          /** this branch is for compatibility, someone may use `values` in single filter mode */
          this.internalActiveFilters[column.key] =
            defaultFilterOptionValues === null ? [] : defaultFilterOptionValues
        } else {
          this.internalActiveFilters[column.key] =
            column.defaultFilterOptionValue
        }
      }
    })
    this.internalCheckedRowKeys = this.defaultCheckedRowKeys
  },
  methods: {
    // events
    doUpdateCheckedRowKeys (...args) {
      const {
        'onUpdate:checkedRowKeys': onUpdateCheckedRowKeys,
        onCheckedRowKeysChange
      } = this
      if (onUpdateCheckedRowKeys) call(onUpdateCheckedRowKeys, ...args)
      if (onCheckedRowKeysChange) call(onCheckedRowKeysChange, ...args)
    },
    doUpdatePage (...args) {
      const { 'onUpdate:page': onUpdatePage, onPageChange } = this
      if (onUpdatePage) call(onUpdatePage, ...args)
      if (onPageChange) call(onPageChange, ...args)
    },
    doUpdatePageSize (...args) {
      const {
        'onUpdate:checkedRowKeys': onUpdateCheckedKeys,
        onCheckedRowKeysChange
      } = this
      if (onUpdateCheckedKeys) call(onUpdateCheckedKeys, ...args)
      if (onCheckedRowKeysChange) call(onCheckedRowKeysChange, ...args)
    },
    doUpdateSorter (...args) {
      const { 'onUpdate:sorter': onUpdateSorter, onSorterChange } = this
      if (onUpdateSorter) call(onUpdateSorter, ...args)
      if (onSorterChange) call(onSorterChange, ...args)
    },
    doUpdateFilters (...args) {
      const { 'onUpdate:filters': onUpdateFilters, onFiltersChange } = this
      if (onUpdateFilters) call(onUpdateFilters, ...args)
      if (onFiltersChange) call(onFiltersChange, ...args)
    },
    changeCheckedRowKeys (checkedRowKeys) {
      this.internalCheckedRowKeys = checkedRowKeys
      this.doUpdateCheckedRowKeys(checkedRowKeys)
    },
    changeSorter (sorter) {
      this.internalActiveSorter = sorter
      this.doUpdateSorter(createShallowClonedObject(sorter))
    },
    changeFilters (filters, sourceColumn) {
      if (!filters) {
        this.internalActiveFilters = {}
        this.doUpdateFilters({}, createShallowClonedObject(sourceColumn))
      } else if (isPlainObject(filters)) {
        this.internalActiveFilters = filters
        this.doUpdateFilters(
          createShallowClonedObject(filters),
          createShallowClonedObject(sourceColumn)
        )
      } else if (__DEV__) {
        warn('data-table', '`filters` is not an object')
      }
    },
    scrollMainTableBodyToTop () {
      const { body } = this.getScrollElements()
      body.scrollTop = 0
    },
    getScrollElements () {
      const { mainTableRef } = this
      const header = mainTableRef ? mainTableRef.getHeaderElement() : null
      const body = mainTableRef ? mainTableRef.getBodyElement() : null
      return {
        header,
        body
      }
    },
    handleTableHeaderScroll () {
      const { scrollReceived, scrollingPart } = this
      if (scrollReceived && scrollingPart === 'header') return
      switch (scrollingPart) {
        case null:
          this.scrollingPart = 'header'
          this.scrollReceived = true
          nextFrame(this.syncScrollState)
          break
        case 'body':
          this.scrollingPart = null
          this.scrollReceived = false
          break
      }
    },
    handleTableBodyScroll () {
      const { scrollReceived, scrollingPart } = this
      if (scrollReceived && scrollingPart === 'body') return
      switch (scrollingPart) {
        case null:
          this.scrollingPart = 'body'
          this.scrollReceived = true
          nextFrame(this.syncScrollState)
          break
        case 'header':
          this.scrollingPart = null
          this.scrollReceived = false
          break
      }
    },
    syncScrollState () {
      const { scrollingPart } = this
      if (__DEV__ && scrollingPart === null) {
        warn(
          'data-table',
          'Scroll sync has no corresponding part. This could be a bug of naive-ui.'
        )
      }
      const { header, body } = this.getScrollElements()
      if (body.scrollLeft === header.scrollLeft) {
        this.scrollingPart = null
        this.scrollReceived = false
        return
      }
      switch (scrollingPart) {
        case 'header':
          body.scrollLeft = header.scrollLeft
          break
        case 'body':
          header.scrollLeft = body.scrollLeft
          break
      }
    },
    page (page) {
      this.internalCurrentPage = page
      this.doUpdatePage(page)
    },
    sort (columnKey, order = 'ascend') {
      if (!columnKey) {
        this.clearSorter()
      } else {
        const columnToSort = this.normalizedColumns.find(
          (column) => column.key === columnKey
        )
        if (!columnToSort) return
        const sorter = columnToSort.sorter || null
        this.changeSorter({
          columnKey,
          sorter,
          order: order
        })
      }
    },
    clearSorter () {
      this.changeSorter(null)
    },
    clearFilter () {
      this.clearFilters()
    },
    clearFilters () {
      this.filters({})
    },
    filters (filters) {
      this.filter(filters)
    },
    filter (filters) {
      this.changeFilters(filters)
    },
    checkAll (column) {
      const checkedRowKeys = Array.from(this.mergedCheckedRowKeys)
      const rowKey = this.rowKey
      this.paginatedData.forEach((row) => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(checkedRowKeys, row, true, rowKey)
      })
      this.changeCheckedRowKeys(checkedRowKeys)
    },
    clearCheckAll (column) {
      const checkedRowKeys = Array.from(this.mergedCheckedRowKeys)
      const rowKey = this.rowKey
      this.paginatedData.forEach((row) => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(checkedRowKeys, row, false, rowKey)
      })
      this.changeCheckedRowKeys(checkedRowKeys)
    }
  }
})
</script>
