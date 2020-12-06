<template>
  <div
    class="n-data-table-filter-button"
    :class="{
      'n-data-table-filter-button--active': active,
      'n-data-table-filter-button--popover-visible': showPopover
    }"
  >
    <n-popover
      v-model:show="showPopover"
      trigger="click"
      :theme="NDataTable.mergedTheme"
      :body-style="popoverBodyStyle"
    >
      <template #trigger>
        <div class="n-data-table-filter-button__icon-wrapper">
          <n-icon>
            <filter-icon />
          </n-icon>
        </div>
      </template>
      <n-data-table-filter-menu
        :radio-group-name="column.key"
        :multiple="filterMultiple"
        :value="syntheticFilterValue"
        :options="options"
        :column="column"
        @change="handleFilterChange"
        @cancel="handleFilterMenuCancel"
        @confirm="handleFilterMenuConfirm"
      />
    </n-popover>
  </div>
</template>

<script>
import { NIcon } from '../../../icon'
import NDataTableFilterMenu from './FilterMenu.vue'
import { NPopover } from '../../../popover'
import { FilterIcon } from '../../../_base/icons'

function createActiveFilters (allFilters, columnKey, syntheticFilterValue) {
  const activeFilters = Object.assign({}, allFilters)
  activeFilters[columnKey] = syntheticFilterValue
  return activeFilters
}

export default {
  components: {
    NIcon,
    NDataTableFilterMenu,
    NPopover,
    FilterIcon
  },
  inject: {
    NDataTable: {
      default: null
    }
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
      showPopover: false,
      popoverBodyStyle: { padding: 0 }
    }
  },
  computed: {
    activeFilters () {
      return this.NDataTable.syntheticActiveFilters
    },
    syntheticFilterValue () {
      return this.activeFilters[this.column.key]
    },
    active () {
      if (Array.isArray(this.syntheticFilterValue)) {
        return !!this.syntheticFilterValue.length
      }
      return !!this.syntheticFilterValue
    },
    filterMultiple () {
      return this.column.filterMultiple !== false
    }
  },
  methods: {
    handleFilterChange (syntheticFilterValue) {
      const nextActiveFilters = createActiveFilters(
        this.activeFilters,
        this.column.key,
        syntheticFilterValue
      )
      this.NDataTable.changeFilters(nextActiveFilters, this.column)
    },
    handleFilterMenuCancel () {
      this.showPopover = false
    },
    handleFilterMenuConfirm () {
      this.showPopover = false
    }
  }
}
</script>
