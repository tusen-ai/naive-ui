<template>
  <div
    class="n-data-table"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      'n-data-table--bordered': bordered,
      'n-data-table--single-line': singleLine,
      [`n-data-table--${size}-size`]: true
    }"
  >
    <n-spin :spinning="loading">
      <div
        class="n-data-table-tables-wrapper"
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
          :body-min-height="42"
          @header-scroll="handleMainTableHeaderScroll"
          @scroll="handleTableMainBodyScroll"
        >
          <slot name="append" />
        </base-table>
        <div
          v-if="paginatedData.length === 0"
          class="n-data-table__empty"
          :class="{
            'n-data-table__empty--hide': loading
          }"
        >
          <n-empty />
        </div>
      </div>
      <div
        v-if="pagination"
        class="n-data-table__pagination"
      >
        <n-pagination
          :page="syntheticPagination.page"
          :page-count="syntheticPagination.pageCount"
          :page-slot="pagination.pageSlot"
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
import { setCheckStatusOfRow } from './utils'
import BaseTable from './BaseTable.vue'
import NEmpty from '../../Empty'
import NPagination from '../../Pagination'
import formatLength from '../../_utils/css/formatLength'

function createShallowClonedArray (array) {
  if (Array.isArray(array)) return array.map(createShallowClonedObject)
  return array
}

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
    filterOptionValues: null, // controlled
    filterMode: 'or',
    defaultFilterOptionValues: [],
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
      trHeights: [],
      hoveringRowIndex: null,
      mainTableScrollContainerWidth: null,
      horizontalScrollLeft: 0,
      /* which part is being scrolling: main left right header */
      scrollingPart: null,
      scrollTimerId: null,
      /** internal checked rows */
      internalCheckedRowKeys: [],
      /** internal filters state */
      internalActiveFilters: [],
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
      return this.data ? this.data.filter(row => {
        for (const columnKey of Object.keys(row)) {
          const activeFilterOptionValues = syntheticActiveFilters
            .filter(filter => filter.columnKey === columnKey)
            .map(filter => filter.filterOptionValue)
          if (!activeFilterOptionValues.length) continue
          const columnToFilter = normalizedColumns.find(column => column.key === columnKey)
          /**
           * When async, filter won't be set, so data won't be filtered
           */
          if (columnToFilter && typeof columnToFilter.filter === 'function') {
            if (columnToFilter.filterMode === 'and') {
              if (activeFilterOptionValues.some(filterOptionValue => !columnToFilter.filter(filterOptionValue, row))) {
                return false
              }
            } else {
              if (activeFilterOptionValues.some(filterOptionValue => columnToFilter.filter(filterOptionValue, row))) {
                return true
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
        return Array.isArray(column.filterOptionValues)
      })
      const keyOfColumnsToFilter = columnsWithControlledFilter.map(column => column.key)
      const controlledActiveFilters = []
      columnsWithControlledFilter.forEach(column => {
        column.filterOptionValues.forEach(filterOptionValue => {
          controlledActiveFilters.push({
            columnKey: column.key,
            filterOptionValue
          })
        })
      })
      const uncontrolledFilters = this.internalActiveFilters.filter(({
        columnKey
      }) => !keyOfColumnsToFilter.includes(columnKey))
      const activeFilters = controlledActiveFilters.concat(uncontrolledFilters)
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
        this.$emit('change', {
          sorter: createShallowClonedObject(this.syntheticActiveSorter),
          pagination: createShallowClonedObject(this.syntheticPagination),
          filters: createShallowClonedArray(this.syntheticActiveFilters)
        })
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
      return {
        maxHeight: formatLength(this.maxHeight),
        minHeight: formatLength(this.minHeight)
      }
    },
    countOfCurrentPageCheckedRows () {
      const checkedRowKeys = this.syntheticCheckedRowKeys
      return this.paginatedData.reduce((total, row) => {
        return total + (checkedRowKeys.includes(row.key) ? 1 : 0)
      }, 0)
    },
    someRowsChecked () {
      return this.countOfCurrentPageCheckedRows > 0 && this.countOfCurrentPageCheckedRows < this.paginatedData.length
    },
    allRowsChecked () {
      return this.countOfCurrentPageCheckedRows === this.paginatedData.length
    }
    // handleScroll () {

    // }
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
      if (column.filter && Array.isArray(column.defaultFilterOptionValues)) {
        column.defaultFilterOptionValues.forEach(filterOptionValue => {
          this.internalActiveFilters.push({
            columnKey: column.key,
            filterOptionValue
          })
        })
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
        this.internalActiveFilters = []
        this.$emit('filters-change', [], createShallowClonedObject(sourceColumn))
      } else {
        if (Array.isArray(filters)) {
          this.internalActiveFilters = filters
          this.$emit('filters-change', createShallowClonedArray(filters), createShallowClonedObject(sourceColumn))
        } else {
          this.internalActiveFilters = [ filters ]
          this.$emit('filters-change', [ filters ], sourceColumn)
        }
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
    handleMainTableHeaderScroll (e, active) {
      if (!this.scrollingPart || this.scrollingPart === 'head') {
        if (this.scrollingPart !== 'head') this.scrollingPart = 'head'
        if (this.scrollTimerId) window.clearTimeout(this.scrollTimerId)
        this.scrollTimerId = window.setTimeout(() => {
          this.scrollingPart = null
          this.scrollTimerId = null
        }, 200)
        const {
          scrollLeft
        } = e.target
        const {
          body: bodyEl
        } = this.getScrollElements()
        bodyEl.scrollLeft = scrollLeft
        this.horizontalScrollLeft = scrollLeft
      }
    },
    handleTableMainBodyScroll (e) {
      this.handleTableBodyScroll(e, 'main')
    },
    handleTableBodyScroll (e, part) {
      if (!this.scrollingPart || this.scrollingPart === part) {
        if (this.scrollingPart !== part) this.scrollingPart = part
        if (this.scrollTimerId) window.clearTimeout(this.scrollTimerId)
        this.scrollTimerId = window.setTimeout(() => {
          this.scrollingPart = null
          this.scrollTimerId = null
        }, 200)
        const {
          scrollTop,
          scrollLeft
        } = e.target
        const {
          header: headerEl,
          body: bodyEl
        } = this.getScrollElements()
        if (part === 'main') {
          if (headerEl) {
            headerEl.scrollLeft = scrollLeft
            this.horizontalScrollLeft = scrollLeft
          }
        }
        if (bodyEl && bodyEl.scrollTop !== scrollTop) {
          bodyEl.scrollTop = scrollTop
        }
        this.mainTableScrollContainerWidth = bodyEl.offsetWidth
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
      this.filters([])
    },
    filters (filters) {
      this.filter(filters)
    },
    filter (filters) {
      this.changeFilters(filters)
    },
    collectDOMSizes () {
      const {
        body: mainTableScrollContainer
      } = this.getScrollElements()
      this.mainTableScrollContainerWidth = mainTableScrollContainer.offsetWidth
      const trHeights = Array.from(mainTableScrollContainer.querySelectorAll('tr')).map(el => el.offsetHeight)
      this.trHeights = trHeights
    },
    checkAll (column) {
      const checkedRowKeys = this.syntheticCheckedRowKeys.map(v => v)
      this.paginatedData.forEach(row => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(checkedRowKeys, row, true)
      })
      this.changeCheckedRowKeys(checkedRowKeys)
    },
    clearCheckAll (column) {
      const checkedRowKeys = this.syntheticCheckedRowKeys.map(v => v)
      this.paginatedData.forEach(row => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(checkedRowKeys, row, false)
      })
      this.changeCheckedRowKeys(checkedRowKeys)
    }
  }
}
</script>
