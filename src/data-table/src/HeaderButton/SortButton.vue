<template>
  <render-sorter
    v-if="mergedRenderSorter"
    :render="mergedRenderSorter"
    :order="mergedSortOrder"
    :active="active"
  />
  <span
    v-else
    class="n-data-table-sorter"
    :class="{
      'n-data-table-sorter--asc': active && mergedSortOrder === 'ascend',
      'n-data-table-sorter--desc': active && mergedSortOrder === 'descend'
    }"
  >
    <n-base-icon>
      <arrow-down-icon />
    </n-base-icon>
  </span>
</template>

<script>
import { defineComponent } from 'vue'
import { ArrowDownIcon } from '../../../_base/icons'
import { NBaseIcon } from '../../../_base'
import RenderSorter from './RenderSorter'

export default defineComponent({
  name: 'SortIcon',
  components: {
    NBaseIcon,
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
      const activeSorter = this.NDataTable.mergedActiveSorter
      return activeSorter
    },
    active () {
      return (
        this.activeSorter && this.activeSorter.columnKey === this.column.key
      )
    },
    mergedSortOrder () {
      if (this.active && this.activeSorter) {
        return this.activeSorter.order
      }
      return false
    },
    mergedRenderSorter () {
      return (
        this.NDataTable?.renderSorter ||
        this.$naive?.unstableConfig?.DataTable?.renderSorter
      )
    }
  }
})
</script>
