<template>
  <div
    ref="header"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :style="headerStyle"
    class="n-data-table-base-table-header"
    @scroll="handleScroll"
  >
    <table
      cellspacing="0"
      :style="{
        width: headerStyleWidth
      }"
    >
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :style="createCustomWidthStyle(column, index, placement)"
        >
      <!-- <col v-if="scrollBarWidth" :width="scrollBarWidth" > -->
      </colgroup>
      <thead>
        <tr>
          <template v-for="(column, i) in columns">
            <th
              :key="column.key"
              :style="{
                textAlign: column.align || null,
                height: height && `${height}px`
              }"
              :class="{
                'n-data-table__sortable-column': column.sortable,
                'n-data-table__td-text': column.ellipsis,
                'n-data-table__td-text--ellipsis': column.ellipsis
              }"
            >
              <!-- 当前页全选 -->
              <n-checkbox
                v-if="column.type === 'selection'"
                :checked="checkboxChecked"
                :indeterminate="checkboxIndererminate"
                @input="handleCheckboxInput(column)"
              />
              <row
                v-else
                :index="i"
                :key-name="column.key || i"
                :row="column"
                :title="column.title"
                :column="column"
                :render="column.renderHeader"
              />
              <!-- {{ !column.renderHeader ? column.title : "" }} -->
              <SortIcon
                v-if="column.sortable || column.sorter"
                :active-sorter="activeSorter"
                :column="column"
                @sorter-change="handleSorterChange"
              />
              <!-- 优先自定义 -->
              {{ column.filterDropdown && column.filterDropdown() }}
              <!-- 否则默认渲染 -->
              <PopFilter
                v-if="column.filterable && (column.filterItems || column.asyncFilterItems)"
                :value="createFilterOptionValues(activeFilters, column)"
                :column="column"
                :options="column.filterItems || column.asyncFilterItems"
                @filter-change="handleFilterChange"
              />
            </th>
          </template>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import row from '../row/index.js'
import SortIcon from '../sortIcon'
import PopFilter from '../popFilter'
import { createCustomWidthStyle } from '../utils'
import themeable from '../../../mixins/themeable'
import withapp from '../../../mixins/withapp'

function createActiveFilters (allFilters, columnKey, filters) {
  allFilters = allFilters.filter(filter => filter.columnKey !== columnKey)
  if (!Array.isArray(filters)) {
    filters = [filters]
  }
  return allFilters.concat(filters.map(filter => ({
    columnKey,
    filterOptionValue: filter
  })))
}

function createFilterOptionValues (activeFilters, column) {
  const activeFilterOptionValues = activeFilters.filter(filter => filter.columnKey === column.key).map(filter => filter.filterOptionValue)
  if (column.filterMultiple) {
    return activeFilterOptionValues
  }
  return activeFilterOptionValues[0]
}

export default {
  components: {
    row,
    SortIcon,
    PopFilter
  },
  inject: {
    NDataTable: {
      default: null
    }
  },
  mixins: [withapp, themeable],
  props: {
    placement: {
      type: String,
      default: null
    },
    scrollX: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
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
    }
  },
  computed: {
    checkboxIndererminate () {
      return this.NDataTable.someRowsChecked
    },
    checkboxChecked () {
      return this.NDataTable.allRowsChecked
    },
    activeFilters () {
      return this.NDataTable.activeFilters
    },
    activeSorter () {
      return this.NDataTable.activeSorter
    },
    headerStyleWidth () {
      return this.scrollX && `${this.scrollX}px`
    },
    headerStyle () {
      return {
        overflow: !this.fixed ? 'scroll' : 'hidden'
      }
    }
  },
  methods: {
    handleFilterChange ({
      columnKey,
      filters
    }) {
      this.NDataTable.activeFilters = createActiveFilters(this.activeFilters, columnKey, filters)
    },
    handleSorterChange (sorter) {
      this.NDataTable.activeSorter = sorter
    },
    handleScroll (e) {
      this.$emit('scroll', e)
    },
    createCustomWidthStyle,
    createFilterOptionValues,
    handleCheckboxInput (column) {
      if (this.checkboxIndererminate || this.checkboxChecked) {
        this.NDataTable.clearCheckAll(column)
      } else {
        this.NDataTable.checkAll(column)
      }
    }
  }
}
</script>
