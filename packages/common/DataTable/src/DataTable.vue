<template>
  <div
    class="n-data-table"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-data-table--bordered': bordered,
      'n-data-table--no-data': paginatedData.length === 0
    }"
  >
    <div
      class="n-data-table-tables-wrapper"
    >
      <base-table
        ref="mainTable"
        :header-height="headerHeight"
        :scroll-x="scrollX"
        :body-style="bodyStyle"
        :data="paginatedData"
        :columns="columns"
        :row-class-name="rowClassName"
        :loading="loading"
        :body-min-height="42"
        @header-scroll="handleMainTableHeaderScroll"
        @scroll="e => handleTableBodyScroll(e, 'main')"
      >
        <slot name="append" />
      </base-table>
      <div
        v-if="rightFixedColumns.length"
        class="n-data-table-table-wrapper n-data-table-table-wrapper--right-fixed"
        :class="{
          'n-data-table-table-wrapper--active': mainTableScrollContainerWidth && mainTableScrollContainerWidth + horizontalScrollLeft !== scrollX
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
          :tr-height="trHeight"
          :loading="loading"
          :fixed="true"
          @scroll="e => handleTableBodyScroll(e, 'right')"
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
          :tr-height="trHeight"
          :loading="loading"
          :fixed="true"
          @scroll="e => handleTableBodyScroll(e, 'left')"
        />
      </div>
      <transition name="n-table-loading--transition">
        <div v-if="loading" class="n-data-table__loading">
          <n-spin
            :spinning="true"
            style="width:100%;overflow:hidden;z-index:200;position:absolute;top:50%;"
          />
        </div>
      </transition>
      <div
        v-if="paginatedData.length === 0 && !loading"
        class="n-data-table__no-data-tip"
      >
        No data
      </div>
    </div>
    <div
      v-if="pagination !== false"
      class="n-data-table__pagination"
    >
      <n-pagination
        :page="synthesizedPagination.page"
        :page-count="synthesizedPagination.pageCount"
        :page-slot="pagination.pageSlot"
        :show-quick-jumper="!!pagination.showQuickJumper"
        :disabled="loading || !!pagination.disabled"
        :on-change="synthesizedOnPageChange"
        :on-page-size-change="synthesizedOnPageSizeChange"
      />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import { setCheckStatusOfRow } from './utils'
import BaseTable from './BaseTable.vue'

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

export default {
  name: 'NDataTable',
  components: {
    BaseTable
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
    onChange: {
      type: Function,
      default: () => {}
    },
    minHeight: {
      type: [ Number, String ],
      default: 'unset'
    },
    maxHeight: {
      type: [ Number, String ],
      default: null
    },
    maxWidth: {
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
      type: [Array, String, Object, Function],
      default: ''
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
    }
  },
  data () {
    return {
      triggerOnChange: true,
      headerHeight: null,
      trHeight: null,

      hoveringRowIndex: null,
      mainTableScrollContainerWidth: null,
      horizontalScrollLeft: 0,

      scrollingPart: null, // main left right header
      scrollTimerId: null, // RequestAnimationFrame
      checkedRows: [],
      /** internal filters state */
      internalActiveFilters: [],
      /** internal sorter state */
      internalActiveSorter: null,
      /** internal pagination state */
      internalCurrentPage: 1,
      internalPageSize: null
    }
  },
  computed: {
    leftFixedColumns () {
      return this.columns
        .filter(column => column.fixed === 'left')
        .map(column => Object.assign({}, column, { fixed: false }))
    },
    rightFixedColumns () {
      return this.columns
        .filter(column => column.fixed === 'right')
        .map(column => Object.assign({}, column, { fixed: false }))
    },
    filteredData () {
      return this.data ? this.data.filter(row => {
        for (const columnKey of Object.keys(row)) {
          const activeFilterOptionValues = this.synthesizedActiveFilters
            .filter(filter => filter.columnKey === columnKey)
            .map(filter => filter.filterOptionValue)
          if (!activeFilterOptionValues.length) continue
          const columnToFilter = this.columns.find(column => column.key === columnKey)
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
    synthesizedActiveFilters () {
      const columnsWithControlledFilter = this.columns.filter(column => {
        return Array.isArray(column.activeFilterOptionValues)
      })
      const keyOfColumnsToFilter = columnsWithControlledFilter.map(column => column.key)
      const controlledActiveFilters = []
      columnsWithControlledFilter.forEach(column => {
        column.activeFilterOptionValues.forEach(filterOptionValue => {
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
      const columnsWithControlledSortOrder = this.columns.filter(
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
    synthesizedCurrentPage () {
      return this.pagination.page || this.internalCurrentPage
    },
    synthesizedPagination () {
      return {
        ...this.pagination,
        /**
         * writing synthesized props after pagination to avoid
         * pagination[key] === undefined
         * key still exists but value is undefined
         */
        page: this.synthesizedCurrentPage,
        pageSize: this.synthesizedPageCount,
        pageCount: this.synthesizedPageCount
      }
    },
    synthesizedOnPageChange () {
      return page => {
        this.pagination.onChange && this.pagination.onChange(page)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.internalCurrentPage = page
        this.$emit('change', {
          sorter: createShallowClonedObject(this.synthesizedActiveSorter),
          pagination: createShallowClonedObject(this.synthesizedPagination),
          filters: createShallowClonedArray(this.synthesizedActiveFilters)
        })
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
        if (order === false) console.error(['[naive-ui/data-table/sorted-data]: The order of activeSorter shouldn\'t be `false`'])
        const sorter = (activeSorter.sorter === 'default' && ((row1, row2) => {
          const value1 = row1[columnKey]
          const value2 = row2[columnKey]
          if (typeof value1 === 'number') {
            return value1 - value2
          } else if (typeof row1[columnKey] === 'string') {
            return value1.localeCompare(value2)
          }
          return 0
        })) || activeSorter.sorter
        return filteredData.sort((row1, row2) => getFlagOfOrder(order) * sorter(row1, row2))
      }
      return this.filteredData
    },
    paginatedData () {
      if (!this.pagination) return this.sortedData
      const {
        pageSize
      } = this.pagination
      /**
       * When async, pageSize should be false
       */
      if (!pageSize) return this.sortedData
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
      return this.paginatedData.reduce((total, row) => {
        return total + (this.checkedRows.includes(row) ? 1 : 0)
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
    checkedRows (value) {
      this.$emit('select', value)
    },
    data () {
      /** TODO: init logic should be fulfilled */
    }
  },
  created () {
    this.columns.forEach(column => {
      if (
        column.defaultSortOrder === 'ascend' ||
        column.defaultSortOrder === 'descend'
      ) {
        this.internalActiveSorter = {
          columnKey: column.key,
          sorter: column.sorter || null,
          order: column.defaultSortOrder
        }
      }
      if (Array.isArray(column.defaultFilterOptionValues)) {
        column.defaultFilterOptionValues.forEach(filterOptionValue => {
          this.internalActiveFilters.push({
            columnKey: column.key,
            filterOptionValue
          })
        })
      }
    })
  },
  mounted () {
    this.collectDOMSizes()
    /** TODO: use resize observer */
    window.addEventListener('resize', this.collectDOMSizes)
  },
  beforeDestroy () {
    /** TODO: use resize observer */
    window.removeEventListener('resize', this.collectDOMSizes)
  },
  methods: {
    changeSorter (sorter) {
      this.internalActiveSorter = sorter
      this.$emit('sorter-change', createShallowClonedObject(sorter))
      this.$emit('change', {
        pagination: createShallowClonedObject(this.synthesizedPagination),
        sorter: createShallowClonedObject(sorter),
        filters: createShallowClonedArray(this.synthesizedActiveFilters)
      })
    },
    changeFilters (filters, sourceColumn) {
      if (!filters) {
        this.internalActiveFilters = []
        this.$emit('filters-change', [], sourceColumn)
        this.$emit('change', {
          pagination: this.synthesizedPagination,
          sorter: this.synthesizedActiveSorter,
          filters: []
        })
      } else {
        if (Array.isArray(filters)) {
          this.internalActiveFilters = filters
          this.$emit('filters-change', createShallowClonedArray(filters), sourceColumn)
          this.$emit('change', {
            pagination: createShallowClonedObject(this.synthesizedPagination),
            sorter: createShallowClonedObject(this.synthesizedActiveSorter),
            filters: createShallowClonedArray(filters)
          })
        } else {
          this.internalActiveFilters = [ filters ]
          this.$emit('filters-change', [ filters ], sourceColumn)
          this.$emit('change', {
            pagination: createShallowClonedObject(this.synthesizedPagination),
            sorter: createShallowClonedObject(this.synthesizedActiveSorter),
            filters: [ filters ]
          })
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
    },
    sort (columnKey, order = 'ascend') {
      if (!columnKey) this.internalActiveSorter = null
      else {
        const columnToSort = this.columns.find(column => column.key === columnKey)
        if (!columnToSort) return
        const sorter = columnToSort.sorter || null
        this.internalActiveSorter = {
          columnKey,
          sorter,
          order: order
        }
      }
    },
    clearSorter () {
      this.internalActiveSorter = null
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
        header: headerEl
      } = this.getScrollElements()
      this.headerHeight = headerEl.offsetHeight
      const { body: mainTableScrollContainer } = this.getScrollElements()
      this.mainTableScrollContainerWidth = mainTableScrollContainer.offsetWidth
    },
    checkAll (column) {
      this.paginatedData.forEach(row => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(this.checkedRows, row, true)
      })
    },
    clearCheckAll (column) {
      this.paginatedData.forEach(row => {
        if (column.disabled && column.disabled(row)) {
          return
        }
        setCheckStatusOfRow(this.checkedRows, row, false)
      })
    }
  }
}
</script>
