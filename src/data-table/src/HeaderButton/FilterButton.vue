<template>
  <n-popover
    v-model:show="showPopover"
    trigger="click"
    :unstable-theme="NDataTable.mergedTheme.peers.Popover"
    :unstable-theme-overrides="NDataTable.mergedTheme.overrides.Popover"
    :padded="false"
  >
    <template #trigger>
      <render-filter
        v-if="mergedRenderFilter"
        :render="mergedRenderFilter"
        :active="active"
        :show="showPopover"
        @click.stop
      />
      <div
        v-else
        class="n-data-table-filter"
        :class="{
          'n-data-table-filter--active': active,
          'n-data-table-filter--show': showPopover
        }"
        @click.stop
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
</template>

<script>
import { defineComponent } from 'vue'
import { FilterIcon } from '../../../_base/icons'
import { NIcon } from '../../../icon'
import { NPopover } from '../../../popover'
import RenderFilter from './RenderFilter'
import NDataTableFilterMenu from './FilterMenu.vue'

function createActiveFilters (allFilters, columnKey, mergedFilterValue) {
  const activeFilters = Object.assign({}, allFilters)
  activeFilters[columnKey] = mergedFilterValue
  return activeFilters
}

export default defineComponent({
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
      showPopover: false
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
      return (
        this.NDataTable.renderFilter ||
        this.$naive?.unstableConfig?.DataTable?.renderFilter
      )
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
})
</script>
