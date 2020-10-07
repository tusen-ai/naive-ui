<template>
  <div
    :class="{
      [`n-${theme}-theme`]: theme
    }"
    :style="headerStyle"
    class="n-data-table-base-table-header"
    @scroll="handleScroll"
  >
    <table
      ref="body"
      class="n-data-table-table"
      :style="{
        minWidth: scrollX
      }"
    >
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="column.key"
          :style="createCustomWidthStyle(column, index, placement)"
        >
      </colgroup>
      <thead class="n-data-table-thead">
        <tr class="n-data-table-tr">
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            :ref="column.key"
            :style="{
              textAlign: column.align || null,
              left: NDataTable.currentFixedColumnLeft(column),
              right: NDataTable.currentFixedColumnRight(column)
            }"
            class="n-data-table-th"
            :class="{
              'n-data-table-th--filterable': isColumnFilterable(column),
              'n-data-table-th--sortable': isColumnSortable(column),
              [`n-data-table-th--fixed-${column.fixed}`]: column.fixed && column.width,
              'n-data-table-th--shadow-after': leftActiveFixedColumn[column.key],
              'n-data-table-th--shadow-before': rightActiveFixedColumn[column.key],
              'n-data-table-th--selection': column.type === 'selection'
            }"
            @click="handleHeaderClick($event, column)"
          >
            <n-checkbox
              v-if="column.type === 'selection'"
              :key="currentPage"
              table-header
              :checked="checkboxChecked"
              :indeterminate="checkboxIndererminate"
              @update:checked="handleCheckboxInput(column)"
            />
            <div v-if="column.ellipsis" class="n-data-table-th__ellipsis">
              <render
                :render="typeof column.title === 'function'
                  ? h => (column.title)(column, index)
                  : column.title
                "
              />
            </div>
            <template v-else>
              <render
                :render="typeof column.title === 'function'
                  ? () => (column.title)(column, index)
                  : column.title
                "
              />
            </template>
            <sort-button
              v-if="isColumnSortable(column)"
              :column="column"
            />
            <filter-button
              v-if="isColumnFilterable(column)"
              :ref="`${column.key}Filter`"
              :column="column"
              :options="column.filterOptions"
            />
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import SortButton from '../HeaderButton/SortButton.vue'
import FilterButton from '../HeaderButton/FilterButton.vue'
import { createCustomWidthStyle } from '../utils'
import { render } from '../../../_utils/vue'
import resizeObserverDelegate from '../../../_utils/delegate/resizeObserverDelegate'

function isColumnSortable (column) {
  return !!column.sorter
}

function isColumnFilterable (column) {
  return !!column.filter
}

function getNextOrderOf (order) {
  if (!order) return 'ascend'
  else if (order === 'ascend') return 'descend'
  return false
}

function createNextSorter (columnKey, activeSorter, sorter) {
  const currentOrder = (activeSorter && activeSorter.order) || false
  let nextOrder = getNextOrderOf(false)
  if (activeSorter && activeSorter.columnKey === columnKey) {
    nextOrder = getNextOrderOf(currentOrder)
  }
  if (!nextOrder) return null
  return {
    columnKey,
    order: nextOrder,
    sorter
  }
}

export default {
  components: {
    render,
    SortButton,
    FilterButton
  },
  provide () {
    return {
      NDataTableHeader: this
    }
  },
  inject: {
    NDataTable: {
      default: null
    }
  },
  props: {
    placement: {
      type: String,
      default: null
    },
    scrollX: {
      type: [Number, String],
      default: null
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    fixed: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:activeFixedColumn': {
      type: Function,
      required: true
    }
  },
  data: function () {
    return {
      leftActiveFixedColumn: [],
      rightActiveFixedColumn: []
    }
  },
  computed: {
    pagination () {
      return this.NDataTable.syntheticPagination
    },
    currentPage () {
      return (this.pagination && this.pagination.page) || null
    },
    theme () {
      return this.NDataTable.mergedTheme
    },
    checkboxIndererminate () {
      return this.NDataTable.someRowsChecked
    },
    checkboxChecked () {
      return this.NDataTable.allRowsChecked
    },
    activeFilters () {
      return this.NDataTable.syntheticActiveFilters
    },
    headerStyle () {
      return {
        overflow: !this.fixed ? 'scroll' : 'hidden'
      }
    },
    fixedColumnsLeft () {
      let columnsLeft = {}
      let left = 0
      let columns = this.columns
      columns.map((column) => {
        if (this.NDataTable.leftFixedColumns.indexOf(column) > -1) {
          columnsLeft[column.key] = left
        }
        left = left + this.$refs[column.key].offsetWidth
      })
      return columnsLeft
    },
    fixedColumnsRight () {
      let columnsRight = {}
      let right = 0
      let columns = this.columns
      for (let i = columns.length - 1; i >= 0; i--) {
        if (this.NDataTable.rightFixedColumns.indexOf(this.columns[i]) > -1) {
          columnsRight[columns[i].key] = right
        }
        right = right + this.$refs[columns[i].key].offsetWidth
      }
      return columnsRight
    }
  },
  mounted () {
    resizeObserverDelegate.registerHandler(this.$el, this.handleResize)
    this.handleResize()
    this.setActiveLeftFixedColumn(this.$el)
    this.setActiveRightFixedColumn(this.$el)
    this.doUpdateActiveFixedColumn(this.leftActiveFixedColumn, this.rightActiveFixedColumn)
  },
  beforeUnmount () {
    resizeObserverDelegate.unregisterHandler(this.$el)
  },
  methods: {
    doUpdateActiveFixedColumn (...args) {
      const {
        'onUpdate:activeFixedColumn': onUpdateActiveFixedColumn
      } = this
      onUpdateActiveFixedColumn(...args)
    },
    isColumnSortable,
    isColumnFilterable,
    createCustomWidthStyle,
    handleResize () {
      this.tableWidth = this.$el.offsetWidth
    },
    handleScroll (e) {
      this.setActiveRightFixedColumn(e.target)
      this.setActiveLeftFixedColumn(e.target)
      this.doUpdateActiveFixedColumn(this.leftActiveFixedColumn, this.rightActiveFixedColumn)
      this.NDataTable.handleTableHeaderScroll(e)
    },
    handleCheckboxInput (column) {
      if (this.checkboxIndererminate || this.checkboxChecked) {
        this.NDataTable.clearCheckAll(column)
      } else {
        this.NDataTable.checkAll(column)
      }
    },
    handleHeaderClick (e, column) {
      let filterRef = this.$refs[`${column.key}Filter`]
      if (Array.isArray(filterRef)) filterRef = filterRef[0]
      const filterElement = filterRef && filterRef.$el
      if (filterElement && filterElement.contains(e.target)) return
      if (!column.sorter) return
      const activeSorter = this.NDataTable.syntheticActiveSorter
      const nextSorter = createNextSorter(column.key, activeSorter, column.sorter)
      this.NDataTable.changeSorter(nextSorter)
    },
    setActiveRightFixedColumn (target) {
      const rightFixedColumns = this.NDataTable.rightFixedColumns
      const scrollLeft = target.scrollLeft
      const tableWidth = this.tableWidth
      const scrollWidth = target.scrollWidth
      let rightWidth = 0
      const fixedColumnsRight = this.fixedColumnsRight
      const rightActiveFixedColumn = {}
      this.rightActiveFixedColumn = rightActiveFixedColumn
      for (let i = rightFixedColumns.length - 1; i >= 0; --i) {
        const key = rightFixedColumns[i].key
        if (scrollLeft + fixedColumnsRight[key] + tableWidth - rightWidth < scrollWidth) {
          this.rightActiveFixedColumn = { [key]: true }
          rightWidth += rightFixedColumns[i].width
        } else {
          break
        }
      }
    },
    setActiveLeftFixedColumn (target) {
      const leftFixedColumns = this.NDataTable.leftFixedColumns
      const scrollLeft = target.scrollLeft
      let leftWidth = 0
      const fixedColumnsLeft = this.fixedColumnsLeft
      this.leftActiveFixedColumn = {}
      for (let i = 0; i < leftFixedColumns.length; ++i) {
        const key = leftFixedColumns[i].key
        if (scrollLeft > fixedColumnsLeft[key] - leftWidth) {
          this.leftActiveFixedColumn = { [key]: true }
          leftWidth += leftFixedColumns[i].width
        } else {
          break
        }
      }
    }
  }
}
</script>
