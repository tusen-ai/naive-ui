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
        <render-filter
          v-if="mergedRenderFilter"
          :render="mergedRenderFilter"
          :active="active"
          :show="popoverVisible"
          :theme="NDataTable.mergedTheme"
        />
        <div
          v-else
          class="n-data-table-filter-button__icon-wrapper"
        >
          <n-icon>
            <filter-icon />
          </n-icon>
        </div>
      </template>
      <n-data-table-filter-menu
        :radio-group-name="column.key"
        :multiple="filterMultiple"
        :value="mergedFilterValue"
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
import RenderFilter from './RenderFilter'
import { NIcon } from '../../../icon'
import NDataTableFilterMenu from './FilterMenu.vue'
import { NPopover } from '../../../popover'
import { FilterIcon } from '../../../_base/icons'

function createActiveFilters (allFilters, columnKey, mergedFilterValue) {
  const activeFilters = Object.assign({}, allFilters)
  activeFilters[columnKey] = mergedFilterValue
  return activeFilters
}

export default {
  components: {
    NIcon,
    RenderFilter,
    NDataTableFilterMenu,
    NPopover,
    FilterIcon
  },
  inject: ['NDataTable'],
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
      return this.NDataTable.mergedActiveFilters
    },
    mergedFilterValue () {
      return this.activeFilters[this.column.key]
    },
    active () {
      if (Array.isArray(this.mergedFilterValue)) {
        return !!this.mergedFilterValue.length
      }
      return !!this.mergedFilterValue
    },
    filterMultiple () {
      return this.column.filterMultiple !== false
    },
    mergedRenderFilter () {
      return this.NDataTable.renderFilter || this.$naive?.unstableConfig?.DataTable?.renderFilter
    }
  },
  methods: {
    handleFilterChange (mergedFilterValue) {
      const nextActiveFilters = createActiveFilters(
        this.activeFilters,
        this.column.key,
        mergedFilterValue
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
