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
                'n-data-table__sortable-column': column.sorter || column.sortOrder !== undefined,
                'n-data-table__td-text': column.ellipsis,
                'n-data-table__td-text--ellipsis': column.ellipsis
              }"
              @click="handleHeaderClick(column)"
            >
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
              <sort-button
                v-if="column.sorter || column.sortOrder"
                :column="column"
              />
              <filter-button
                v-if="column.filterOptions || column.asyncFilterOptions"
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
    handleScroll (e) {
      this.$emit('scroll', e)
    },
    createCustomWidthStyle,
    handleCheckboxInput (column) {
      if (this.checkboxIndererminate || this.checkboxChecked) {
        this.NDataTable.clearCheckAll(column)
      } else {
        this.NDataTable.checkAll(column)
      }
    },
    handleHeaderClick (column) {
      const activeSorter = this.NDataTable.synthesizedActiveSorter
      const nextSorter = createNextSorter(column.key, activeSorter, column.sorter)
      this.NDataTable.changeSorter(nextSorter)
    }
  }
}
</script>
