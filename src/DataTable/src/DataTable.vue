<template>
  <div
    class="n-data-table"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-data-table--bordered': bordered,
      'n-data-table--single-line': singleLine,
      'n-data-table--single-column': singleColumn,
      [`n-data-table--${size}-size`]: true
    }"
  >
    <n-spin
      :spinning="loading"
      :theme="syntheticTheme"
    >
      <div
        class="n-data-table-wrapper"
      >
        <base-table
          ref="mainTable"
          main
          :scroll-x="styleScrollX"
          :body-style="bodyStyle"
          :data="paginatedData"
          :columns="normalizedColumns"
          :row-class-name="rowClassName"
          :loading="loading"
        >
          <div
            v-if="paginatedData.length === 0"
            class="n-data-table-empty"
            :class="{
              'n-data-table-empty--hide': loading
            }"
          >
            <n-empty :theme="syntheticTheme" />
          </div>
        </base-table>
      </div>
      <div
        v-if="pagination"
        class="n-data-table__pagination"
      >
        <n-pagination
          :theme="syntheticTheme"
          :page="syntheticPagination.page"
          :page-count="syntheticPagination.pageCount"
          :page-size="syntheticPagination.pageSize"
          :page-slot="pagination.pageSlot"
          :page-sizes="pagination.pageSizes"
          :show-size-picker="pagination.showSizePicker"
          :show-quick-jumper="!!pagination.showQuickJumper"
          :disabled="!!pagination.disabled"
          :on-change="syntheticOnPageChange"
          :on-page-size-change="syntheticOnPageSizeChange"
        />
      </div>
    </n-spin>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import locale from '../../_mixins/locale'
import { setCheckStatusOfRow, createRowKey } from './utils'
import BaseTable from './BaseTable.vue'
import NEmpty from '../../Empty'
import NPagination from '../../Pagination'
import formatLength from '../../_utils/css/formatLength'
import isPlainObject from 'lodash-es/isPlainObject'

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
    fixed: false,
    width: null
  }
  Object.keys(column).forEach(key => {
    if (column[key] !== undefined) {
      defaultColumn[key] = column[key]
    }
  })
  if (!column.key && column.type === 'selection') {
    defaultColumn.key = 'selection'
    defaultColumn.width = 48
  }
  return defaultColumn
}

export default {
  name: 'NDataTable',
  components: {
    BaseTable,
    NEmpty,
    NPagination
  },
  mixins: [ withapp, themeable, locale('DataTable') ],
  provide () {
    return {
      NDataTable: this
    }
  },
  props: {
    pagination: {
      type: [ Object, Boolean ],
      default: false
    },
    minHeight: {
      type: [ Number, String ],
      default: null
    },
    maxHeight: {
      type: [ Number, String ],
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
      type: [ String, Function ],
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
      type: [ Number, String ],
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
    }
  },
  data () {
    return {
      /** collected tr heights of main table */
      horizontalScrollLeft: 0,
      /* which part is being scrolling: main left right header */
      scrollingPart: null,
      scrollTimerId: null,
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
      return this.columns
        .map(column => normalizeColumn(column))
    },
    leftFixedColumns () {
      return this.normalizedColumns
        .filter(column => column.fixed === 'left')
    },
    rightFixedColumns () {
      return this.normalizedColumns
        .filter(column => column.fixed === 'right')
    },
    filteredData () {
      const syntheticActiveFilters = this.syntheticActiveFilters
      const normalizedColumns = this.normalizedColumns
      function createDefaultFilter (columnKey) {
        return (filterOptionValue, row) => ~String(row[columnKey]).indexOf(String(filterOptionValue))
      }
      const data = this.data
      return data ? data.filter(row => {
        for (const columnKey of Object.keys(row)) {
          let activeFilterOptionValues = syntheticActiveFilters[columnKey]
          if (activeFilterOptionValues == null) continue
          if (!activeFilterOptionValues.length) continue
          if (!Array.isArray(activeFilterOptionValues)) activeFilterOptionValues = [activeFilterOptionValues]
          const columnToFilter = normalizedColumns.find(column => column.key === columnKey)
          /**
           * When async, filter won't be set, so data won't be filtered
           */
          const filter = columnToFilter.filter === 'default'
            ? createDefaultFilter(columnKey)
            : columnToFilter.filter
          if (columnToFilter && typeof filter === 'function') {
            if (columnToFilter.filterMode === 'and') {
              if (activeFilterOptionValues.some(filterOptionValue => !filter(filterOptionValue, row))) {
                return false
              }
            } else {
              if (activeFilterOptionValues.some(filterOptionValue => filter(filterOptionValue, row))) {
                continue
              } else {
                return false
              }
            }
          }
        }
        return true
      }) : []
    },
    syntheticCheckedRowKeys () {
      if (this.checkedRowKeys !== null) return this.checkedRowKeys
      return this.internalCheckedRowKeys
    },
    syntheticActiveFilters () {
      const columnsWithControlledFilter = this.normalizedColumns.filter(column => {
        return column.filterOptionValues !== undefined || column.filterOptionValue !== undefined
      })
      const controlledActiveFilters = {}
      columnsWithControlledFilter.forEach(column => {
        controlledActiveFilters[column.key] = column.filterOptionValues || column.filterOptionValue || null
      })
      const activeFilters = Object.assign(
        createShallowClonedObject(this.internalActiveFilters),
        controlledActiveFilters
      )
      return activeFilters
    },
    syntheticActiveSorter () {
      /**
       * If one of the columns's sort order is false or 'ascend' or 'descend',
       * the table's controll functionality should work in controlled manner.
       */
      const columnsWithControlledSortOrder = this.normalizedColumns.filter(
        column => column.sortOrder === false ||
        column.sortOrder === 'ascend' ||
        column.sortOrder === 'descend'
      )
      const columnToSort = columnsWithControlledSortOrder.find(column => column.sortOrder)
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
    syntheticPageSize () {
      return this.pagination.pageSize || this.internalPageSize
    },
    syntheticCurrentPage () {
      return this.pagination.page || this.internalCurrentPage
    },
    syntheticPagination () {
      if (!this.pagination) return null
      return {
        ...this.pagination,
        /**
         * writing synthetic props after pagination to avoid
         * pagination[key] === undefined
         * key still exists but value is undefined
         */
        page: this.syntheticCurrentPage,
        pageSize: this.syntheticPageSize,
        pageCount: this.syntheticPageCount
      }
    },
    syntheticOnPageChange () {
      return page => {
        this.pagination.onChange && this.pagination.onChange(page)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.internalCurrentPage = page
        this.$emit('page-change', page)
      }
    },
    syntheticOnPageSizeChange () {
      return pageSize => {
        this.pagination.onPageSizeChange && this.pagination.onPageSizeChange(pageSize)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.internalPageSize = pageSize
        // this.$emit('change', {
        //   sorter: createShallowClonedObject(this.syntheticActiveSorter),
        //   pagination: createShallowClonedObject(this.syntheticPagination),
        //   filters: createShallowClonedObject(this.syntheticActiveFilters)
        // })
        this.$emit('page-size-change')
      }
    },
    syntheticPageCount () {
      if (this.pagination.pageCount) return this.pagination.pageCount
      if (this.filteredData.length === 0) return 1
      const { pageSize } = this.pagination
      return Math.ceil(this.filteredData.length / pageSize)
    },
    sortedData () {
      const activeSorter = this.syntheticActiveSorter
      if (activeSorter) {
        /**
         * When async, syntheticActiveSorter.sorter should be true
         * If want use default sorter, syntheticActiveSorter.sorter should be 'default'
         */
        if (
          activeSorter.sorter === true ||
          (
            typeof activeSorter.sorter !== 'function' &&
            activeSorter.sorter !== 'default'
          )
        ) return this.filteredData
        const filteredData = this.filteredData.slice(0)
        const columnKey = activeSorter.columnKey
        /**
         * 1 for asc
         * -1 for desc
         */
        const order = activeSorter.order
        const sorter = (
          activeSorter.sorter === 'default'
            ? (row1, row2) => {
              const value1 = row1[columnKey]
              const value2 = row2[columnKey]
              if (typeof value1 === 'number' && typeof value2 === 'number') {
                return value1 - value2
              } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                return value1.localeCompare(value2)
              }
              return 0
            }
            : activeSorter.sorter
        )
        return filteredData.sort((row1, row2) => getFlagOfOrder(order) * sorter(row1, row2))
      }
      return this.filteredData
    },
    paginatedData () {
      if (!this.pagination) return this.sortedData
      if (!this.paging) return this.sortedData
      const pageSize = this.syntheticPageSize
      const startIndex = (this.internalCurrentPage - 1) * pageSize
      return this.sortedData.slice(startIndex, startIndex + pageSize)
    },
    bodyStyle () {
      /** if bordered, minus border width of table */
      const offset = this.bordered ? -2 : 0
      return {
        maxHeight: formatLength(this.maxHeight, 1, offset),
        minHeight: formatLength(this.minHeight, 1, offset)
      }
    },
    countOfCurrentPageCheckedRows () {
      const checkedRowKeys = this.syntheticCheckedRowKeys
      const rowKey = this.rowKey
      return this.paginatedData.reduce((total, row) => {
        const key = createRowKey(row, rowKey)
        return total + (checkedRowKeys.includes(key) ? 1 : 0)
      }, 0)
    },
    someRowsChecked () {
      return this.countOfCurrentPageCheckedRows > 0 && this.countOfCurrentPageCheckedRows < this.paginatedData.length
    },
    allRowsChecked () {
      return this.countOfCurrentPageCheckedRows === this.paginatedData.length
    }
  },
  watch: {
    syntheticCurrentPage () {
      this.scrollMainTableBodyToTop()
    },
    data () {
      /** TODO: init logic should be fulfilled */
    }
  },
  created () {
    this.normalizedColumns.forEach(column => {
      if (
        column.sorter && (
          column.defaultSortOrder === 'ascend' ||
          column.defaultSortOrder === 'descend'
        )
      ) {
        this.internalActiveSorter = {
          columnKey: column.key,
          sorter: column.sorter,
          order: column.defaultSortOrder
        }
      }
      if (
        column.filter
      ) {
        const defaultFilterOptionValues = column.defaultFilterOptionValues
        if (column.filterMultiple) {
          this.internalActiveFilters[column.key] = defaultFilterOptionValues || []
        } else if (
          defaultFilterOptionValues !== undefined
        ) {
          /** this branch is for compatibility, someone may use `values` in single filter mode */
          this.internalActiveFilters[column.key] = defaultFilterOptionValues === null ? [] : defaultFilterOptionValues
        } else {
          this.internalActiveFilters[column.key] = column.defaultFilterOptionValue
        }
      }
    })
    this.internalCheckedRowKeys = this.defaultCheckedRowKeys
  },
  methods: {
    changeCheckedRowKeys (checkedRowKeys) {
      this.internalCheckedRowKeys = checkedRowKeys
      this.$emit('checked-row-keys-change', checkedRowKeys)
    },
    changeSorter (sorter) {
      this.internalActiveSorter = sorter
      this.$emit('sorter-change', createShallowClonedObject(sorter))
    },
    changeFilters (filters, sourceColumn) {
      if (!filters) {
        this.internalActiveFilters = {}
        this.$emit('filters-change', {}, createShallowClonedObject(sourceColumn))
      } else if (isPlainObject(filters)) {
        this.internalActiveFilters = filters
        this.$emit('filters-change', createShallowClonedObject(filters), createShallowClonedObject(sourceColumn))
      } else {
        console.error('[naive-ui/n-data-table]: filters is not an object')
      }
    },
    scrollMainTableBodyToTop () {
      const {
        body
      } = this.getScrollElements()
      body.scrollTop = 0
    },
    getScrollElements () {
      const header = this.$refs.mainTable.getHeaderElement()
      const body = this.$refs.mainTable ? this.$refs.mainTable.getBodyElement() : null
      return {
        header,
        body
      }
    },
    handleTableHeaderScroll (e, active) {
      if (this.scrollingPart === null) {
        this.scrollingPart = 'header'
      }
      if (this.scrollingPart === 'header') {
        window.clearTimeout(this.scrollTimerId)
        this.scrollTimerId = window.setTimeout(() => {
          this.scrollingPart = null
        }, 200)
      }
      if (this.scrollingPart === 'body') {
        return
      }
      const {
        scrollLeft
      } = e.target
      const {
        body: bodyEl
      } = this.getScrollElements()
      bodyEl.scrollLeft = scrollLeft
      this.horizontalScrollLeft = scrollLeft
    },
    handleTableBodyScroll (e) {
      if (this.scrollingPart === null) {
        this.scrollingPart = 'body'
      }
      if (this.scrollingPart === 'body') {
        window.clearTimeout(this.scrollTimerId)
        this.scrollTimerId = window.setTimeout(() => {
          this.scrollingPart = null
        }, 200)
      }
      if (this.scrollingPart === 'header') {
        return
      }
      const {
        scrollLeft
      } = e.target
      const {
        header: headerEl
      } = this.getScrollElements()
      if (headerEl) {
        headerEl.scrollLeft = scrollLeft
        this.horizontalScrollLeft = scrollLeft
      }
    },
    page (page) {
      this.internalCurrentPage = page
      this.$emit('page-change', page)
    },
    sort (columnKey, order = 'ascend') {
      if (!columnKey) {
        this.clearSorter()
      } else {
        const columnToSort = this.normalizedColumns.find(column => column.key === columnKey)
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
      const checkedRowKeys = this.syntheticCheckedRowKeys.map(v => v)
      const rowKey = this.rowKey
      this.paginatedData.forEach(row => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(checkedRowKeys, row, true, rowKey)
      })
      this.changeCheckedRowKeys(checkedRowKeys)
    },
    clearCheckAll (column) {
      const checkedRowKeys = this.syntheticCheckedRowKeys.map(v => v)
      const rowKey = this.rowKey
      this.paginatedData.forEach(row => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(checkedRowKeys, row, false, rowKey)
      })
      this.changeCheckedRowKeys(checkedRowKeys)
    }
  }
}
</script>
