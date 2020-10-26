<template>
  <div
    :class="{
      [`n-${theme}-theme`]: theme
    }"
    :style="headerStyle"
    class="n-data-table-base-table-header"
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
              'n-data-table-th--shadow-after': NBaseTable.leftActiveFixedColumn[column.key],
              'n-data-table-th--shadow-before': NBaseTable.rightActiveFixedColumn[column.key],
              'n-data-table-th--selection': column.type === 'selection'
            }"
            @click="handleHeaderClick($event, column)"
          >
            <n-checkbox
              v-if="column.type === 'selection'"
              :key="currentPage"
              table-header
              :value="checkboxChecked"
              :indeterminate="checkboxIndererminate"
              @update:value="handleCheckboxInput(column)"
            />
            <template v-if="column.type !== 'selection'">
              <div v-if="column.ellipsis" class="n-data-table-th__ellipsis">
                <render
                  :render="typeof column.title === 'function'
                    ? h => (column.title)(column, index)
                    : column.title
                  "
                />
              </div>
              <render
                v-else
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

function isColumnSortable (column) {
  return !!column.sorter
}

function isColumnFilterable (column) {
  return !!column.filter
}

function getNextOrderOf (order) {
  if (!order) return 'descend'
  else if (order === 'descend') return 'ascend'
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
    },
    NBaseTable: {
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
        overflow: 'scroll'
      }
    }
  },
  methods: {
    isColumnSortable,
    isColumnFilterable,
    createCustomWidthStyle,
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
    }
  }
}
</script>
