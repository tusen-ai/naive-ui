<template>
  <div
    ref="header"
    :class="{
      [`n-${theme}-theme`]: theme
    }"
    :style="headerStyle"
    class="n-data-table-base-table-header"
    @scroll="handleScroll"
  >
    <table
      class="n-data-table-table"
      cellspacing="0"
      :style="{
        width: headerStyleWidth
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
          <template v-for="(column, index) in columns">
            <th
              :key="column.key"
              :style="{
                textAlign: column.align || null,
                height: height && `${height}px`
              }"
              class="n-data-table-th"
              :class="{
                'n-data-table-th--filterable': isColumnFilterable(column),
                'n-data-table-th--sortable': isColumnSortable(column),
                'n-data-table-th--ellipsis': column.ellipsis
              }"
              @click="handleHeaderClick($event, column)"
            >
              <n-checkbox
                v-if="column.type === 'selection'"
                :checked="checkboxChecked"
                :indeterminate="checkboxIndererminate"
                @input="handleCheckboxInput(column)"
              />
              <template v-if="column.renderHeader">
                <render :render="h => column.renderHeader(h, column, index)" />
              </template>
              <template v-else>
                {{ column.title }}
              </template>
              <sort-button
                v-if="isColumnSortable(column)"
                :column="column"
              />
              <filter-button
                v-if="isColumnFilterable(column)"
                :ref="`${column.key}Filter`"
                :column="column"
                :options="column.filterOptions || column.asyncFilterOptions"
              />
            </th>
          </template>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import SortButton from '../HeaderButton/SortButton'
import FilterButton from '../HeaderButton/FilterButton'
import { createCustomWidthStyle } from '../utils'
import render from '../../../../utils/render'

function isColumnSortable (column) {
  return !!(column.sorter || column.sortOrder !== undefined)
}

function isColumnFilterable (column) {
  return !!(column.filterOptions || column.asyncFilterOptions)
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
    theme () {
      return this.NDataTable.synthesizedTheme
    },
    checkboxIndererminate () {
      return this.NDataTable.someRowsChecked
    },
    checkboxChecked () {
      return this.NDataTable.allRowsChecked
    },
    activeFilters () {
      return this.NDataTable.synthesizedActiveFilters
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
    isColumnSortable,
    isColumnFilterable,
    createCustomWidthStyle,
    handleScroll (e) {
      this.$emit('scroll', e)
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
      const activeSorter = this.NDataTable.synthesizedActiveSorter
      const nextSorter = createNextSorter(column.key, activeSorter, column.sorter)
      this.NDataTable.changeSorter(nextSorter)
    }
  }
}
</script>
