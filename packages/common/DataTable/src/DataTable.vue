<template>
  <div
    class="n-data-table"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-data-table--bordered': bordered,
    }"
  >
    <n-spin :spinning="loading">
      <div
        class="n-data-table-tables-wrapper"
      >
        <base-table
          ref="mainTable"
          main
          :header-height="headerHeight"
          :scroll-x="scrollX"
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
          v-if="rightFixedColumns.length"
          class="n-data-table-table-wrapper n-data-table-table-wrapper--right-fixed"
          :class="{
            'n-data-table-table-wrapper--active': mainTableScrollContainerWidth && mainTableScrollContainerWidth + horizontalScrollLeft < scrollX
          }"
        >
          <base-table
            ref="rightFixedTable"
            placement="right"
            :header-height="headerHeight"
            :columns="rightFixedColumns"
            :data="paginatedData"
            :body-style="bodyStyle"
            :row-class-name="rowClassName"
            :tr-heights="trHeights"
            :loading="loading"
            :fixed="true"
            @scroll="handleTableRightBodyScroll"
          />
        </div>
        <div
          v-if="leftFixedColumns.length"
          class="n-data-table-table-wrapper n-data-table-table-wrapper--left-fixed"
          :class="{
            'n-data-table-table-wrapper--active': horizontalScrollLeft > 0
          }"
        >
          <base-table
            ref="leftFixedTable"
            :header-height="headerHeight"
            :columns="leftFixedColumns"
            :data="paginatedData"
            :body-style="bodyStyle"
            :row-class-name="rowClassName"
            header-ref-name="header"
            :tr-heights="trHeights"
            :loading="loading"
            :fixed="true"
            @scroll="handleTableLeftBodyScroll"
          />
        </div>
        <div
          v-if="paginatedData.length === 0"
          class="n-data-table__empty"
        >
          <n-empty />
        </div>
      </div>
      <div
        v-if="pagination"
        class="n-data-table__pagination"
      >
        <n-pagination
          :page="synthesizedPagination.page"
          :page-count="synthesizedPagination.pageCount"
          :page-slot="pagination.pageSlot"
          :show-quick-jumper="!!pagination.showQuickJumper"
          :disabled="!!pagination.disabled"
          :on-change="synthesizedOnPageChange"
          :on-page-size-change="synthesizedOnPageSizeChange"
        />
      </div>
    </n-spin>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import { setCheckStatusOfRow } from './utils'
import BaseTable from './BaseTable.vue'
import NEmpty from '../../Empty'

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
  return defaultColumn
}

export default {
  name: 'NDataTable',
  components: {
    BaseTable,
    NEmpty
  },
  mixins: [ withapp, themeable ],
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
      type: Number,
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
    }
  },
  data () {
    return {
      headerHeight: null,
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
    normalizedColumns () {
      return this.columns
        .map(column => normalizeColumn(column))
    },
    leftFixedColumns () {
      return this.normalizedColumns
        .filter(column => column.fixed === 'left')
        .map(column => Object.assign({}, column, { fixed: false }))
    },
    rightFixedColumns () {
      return this.normalizedColumns
        .filter(column => column.fixed === 'right')
        .map(column => Object.assign({}, column, { fixed: false }))
    },
    filteredData () {
      const synthesizedActiveFilters = this.synthesizedActiveFilters
      const normalizedColumns = this.normalizedColumns
      return this.data ? this.data.filter(row => {
        for (const columnKey of Object.keys(row)) {
          const activeFilterOptionValues = synthesizedActiveFilters
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
    synthesizedCheckedRowKeys () {
      if (this.checkedRowKeys !== null) return this.checkedRowKeys
      return this.internalCheckedRowKeys
    },
    synthesizedActiveFilters () {
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
    synthesizedActiveSorter () {
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
    synthesizedPageSize () {
      return this.pagination.pageSize || this.internalPageSize
    },
    synthesizedCurrentPage () {
      return this.pagination.page || this.internalCurrentPage
    },
    synthesizedPagination () {
      if (!this.pagination) return null
      return {
        ...this.pagination,
        /**
         * writing synthesized props after pagination to avoid
         * pagination[key] === undefined
         * key still exists but value is undefined
         */
        page: this.synthesizedCurrentPage,
        pageSize: this.synthesizedPageSize,
        pageCount: this.synthesizedPageCount
      }
    },
    synthesizedOnPageChange () {
      return page => {
        this.pagination.onChange && this.pagination.onChange(page)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.internalCurrentPage = page
        this.$emit('page-change', page)
      }
    },
    synthesizedOnPageSizeChange () {
      return pageSize => {
        this.pagination.onPageSizeChange && this.pagination.onPageSizeChange(pageSize)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.internalPageSize = pageSize
        this.$emit('change', {
          sorter: createShallowClonedObject(this.synthesizedActiveSorter),
          pagination: createShallowClonedObject(this.synthesizedPagination),
          filters: createShallowClonedArray(this.synthesizedActiveFilters)
        })
        this.$emit('page-size-change')
      }
    },
    synthesizedPageCount () {
      if (this.pagination.pageCount) return this.pagination.pageCount
      if (this.filteredData.length === 0) return 1
      const { pageSize } = this.pagination
      return Math.ceil(this.filteredData.length / pageSize)
    },
    sortedData () {
      const activeSorter = this.synthesizedActiveSorter
      if (activeSorter) {
        /**
         * When async, synthesizedActiveSorter.sorter should be true
         * If want use default sorter, synthesizedActiveSorter.sorter should be 'default'
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
      const pageSize = this.synthesizedPageSize
      const startIndex = (this.internalCurrentPage - 1) * pageSize
      return this.sortedData.slice(startIndex, startIndex + pageSize)
    },
    styleMaxHeight () {
      if (typeof this.maxHeight === 'number') return this.maxHeight + 'px'
      return this.maxHeight
    },
    styleMinHeight () {
      if (typeof this.minHeight === 'number') return this.minHeight + 'px'
      return this.minHeight
    },
    bodyStyle () {
      return {
        maxHeight: this.styleMaxHeight,
        minHeight: this.styleMinHeight
      }
    },
    countOfCurrentPageCheckedRows () {
      const checkedRowKeys = this.synthesizedCheckedRowKeys
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
  },
  watch: {
    synthesizedCurrentPage () {
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
      const fixedLeftBody = this.$refs.leftFixedTable ? this.$refs.leftFixedTable.getBodyElement() : null
      const fixedRightBody = this.$refs.rightFixedTable ? this.$refs.rightFixedTable.getBodyElement() : null
      return {
        header,
        body,
        fixedLeftBody,
        fixedRightBody
      }
    },
    handleMainTableHeaderScroll (e) {
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
    handleTableLeftBodyScroll (e) {
      this.handleTableBodyScroll(e, 'left')
    },
    handleTableRightBodyScroll (e) {
      this.handleTableBodyScroll(e, 'right')
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
          body: bodyEl,
          fixedLeftBody: leftBodyEl,
          fixedRightBody: rightBodyEl
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
        if (leftBodyEl && leftBodyEl.scrollTop !== scrollTop) {
          leftBodyEl.scrollTop = scrollTop
        }
        if (rightBodyEl && rightBodyEl.scrollTop !== scrollTop) {
          rightBodyEl.scrollTop = scrollTop
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
        header: headerEl,
        body: mainTableScrollContainer
      } = this.getScrollElements()
      this.headerHeight = headerEl.offsetHeight
      this.mainTableScrollContainerWidth = mainTableScrollContainer.offsetWidth
      const trHeights = Array.from(mainTableScrollContainer.querySelectorAll('tr')).map(el => el.offsetHeight)
      this.trHeights = trHeights
    },
    checkAll (column) {
      const checkedRowKeys = this.synthesizedCheckedRowKeys.map(v => v)
      this.paginatedData.forEach(row => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(checkedRowKeys, row, true)
      })
      this.changeCheckedRowKeys(checkedRowKeys)
    },
    clearCheckAll (column) {
      const checkedRowKeys = this.synthesizedCheckedRowKeys.map(v => v)
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
