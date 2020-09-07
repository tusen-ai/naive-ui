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
import NIcon from '../../../icon'
import NDataTableFilterMenu from './FilterMenu'
import NPopover from '../../../popover'
import funnel from '../../../_icons/funnel'

function createActiveFilters (allFilters, columnKey, syntheticFilterValue) {
  const activeFilters = Object.assign({}, allFilters)
  activeFilters[columnKey] = syntheticFilterValue
  return activeFilters
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
      this.controller.hide()
    },
    handleFilterMenuConfirm () {
      this.controller.hide()
    }
  }
}
</script>
