<template>
  <render-sorter
    v-if="mergedRenderSorter"
    :render="mergedRenderSorter"
    :order="mergedSortOrder"
    :active="active"
    :theme="NDataTable.mergedTheme"
  />
  <span
    v-else
    class="n-data-table-sort-button"
    :class="{
      'n-data-table-sort-button--asc': active && mergedSortOrder === 'ascend',
      'n-data-table-sort-button--desc': active && mergedSortOrder === 'descend'
    }"
  >
    <n-icon>
      <arrow-down-icon />
    </n-icon>
  </span>
</template>

<script>
import {
  ArrowDownIcon
} from '../../../_base/icons'
import { NIcon } from '../../../icon'
import RenderSorter from './RenderSorter'

export default {
  name: 'SortIcon',
  components: {
    NIcon,
    RenderSorter,
    ArrowDownIcon
  },
  inject: ['NDataTable'],
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  computed: {
    activeSorter () {
      const activeSorter = this.NDataTable.syntheticActiveSorter
      return activeSorter
    },
    active () {
      return this.activeSorter && this.activeSorter.columnKey === this.column.key
    },
    mergedSortOrder () {
      if (this.active && this.activeSorter) {
        return this.activeSorter.order
      }
      return false
    },
    mergedRenderSorter () {
      return this.NDataTable?.renderSorter || this.$naive?.unstableConfig?.DataTable?.renderSorter
    }
  }
}
</script>
