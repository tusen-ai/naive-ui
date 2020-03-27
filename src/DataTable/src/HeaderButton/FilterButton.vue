<template>
  <div
    class="n-data-table-filter-button"
    :class="{
      'n-data-table-filter-button--active': active,
      'n-data-table-filter-button--popover-visible': popoverVisible
    }"
  >
    <n-popover
      trigger="click"
      :theme="NDataTable.syntheticTheme"
      :controller="controller"
      :overlay-style="{ padding: 0 }"
      @show="popoverVisible = true"
      @hide="popoverVisible = false"
    >
      <template v-slot:activator>
        <div class="n-data-table-filter-button__icon-wrapper">
          <n-icon>
            <funnel />
          </n-icon>
        </div>
      </template>
      <n-data-table-filter-menu
        :radio-group-name="column.key"
        :multiple="filterMultiple"
        :value="activeFilterOptionValues"
        :options="options"
        @change="handleFilterChange"
        @cancel="handleFilterMenuCancel"
        @confirm="handleFilterMenuConfirm"
      />
    </n-popover>
  </div>
</template>

<script>
import NIcon from '../../../Icon'
import NDataTableFilterMenu from './FilterMenu'
import NPopover from '../../../Popover'
import funnel from '../../../_icons/funnel'

// function createFilterOptionValues (activeFilters, column) {
//   // const activeFilterOptionValues = activeFilters
//   //   .filter(filter => filter.columnKey === column.key)
//   //   .map(filter => filter.filterOptionValue)
//   const activeFilterOptionValues = activeFilters[column.key]
//   return activeFilterOptionValues
// }

function createActiveFilters (allFilters, columnKey, filterOptionValues) {
  if (!Array.isArray(filterOptionValues)) {
    filterOptionValues = [filterOptionValues]
  }
  allFilters[columnKey] = filterOptionValues
  return allFilters
}

export default {
  inject: {
    NDataTable: {
      default: null
    }
  },
  components: {
    NIcon,
    NDataTableFilterMenu,
    NPopover,
    funnel
  },
  props: {
    column: {
      type: Object,
      required: true
    },
    options: {
      type: [Array, Function],
      required: true
    }
  },
  data () {
    return {
      popoverVisible: false,
      controller: {}
    }
  },
  computed: {
    activeFilters () {
      return this.NDataTable.syntheticActiveFilters
    },
    activeFilterOptionValues () {
      return this.activeFilters[this.column.key]
    },
    active () {
      if (Array.isArray(this.activeFilterOptionValues)) {
        return !!this.activeFilterOptionValues.length
      }
      return !!this.activeFilterOptionValues
    },
    filterMultiple () {
      return this.column.filterMultiple !== false
    }
  },
  methods: {
    handleFilterChange (filterOptionValues) {
      const nextActiveFilters = createActiveFilters(
        this.activeFilters,
        this.column.key,
        filterOptionValues
      )
      this.NDataTable.changeFilters(nextActiveFilters, this.column)
    },
    handleFilterMenuCancel () {
      this.controller.hide()
    },
    handleFilterMenuConfirm () {
      this.controller.hide()
    }
  }
}
</script>
