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
              <template v-if="column.renderHeader">
                <render :render="h => column.renderHeader(h, column, i)" />
              </template>
              <template v-else>
                {{ column.title }}
              </template>
              <SortIcon
                v-if="column.sortable || column.sorter"
                :active-sorter="activeSorter"
                :column="column"
                @sorter-change="handleSorterChange"
              />
              <PopFilter
                v-if="column.filterOptions || column.asyncFilterOptions"
                :value="createFilterOptionValues(activeFilters, column)"
                :column="column"
                :options="column.filterOptions || column.asyncFilterOptions"
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
import SortIcon from '../sortIcon'
import PopFilter from '../popFilter'
import { createCustomWidthStyle } from '../utils'
import themeable from '../../../mixins/themeable'
import withapp from '../../../mixins/withapp'
import render from '../../../utils/render'

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
    render,
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
    /**
     * TODO: following methods should be hoist to NDataTable
     */
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
