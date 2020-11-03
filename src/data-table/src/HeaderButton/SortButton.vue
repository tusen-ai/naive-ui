<template>
  <span
    class="n-data-table-sort-button"
    :class="{
      'n-data-table-sort-button--asc': currentColumnActive && syntheticSortOrder === 'ascend',
      'n-data-table-sort-button--desc': currentColumnActive && syntheticSortOrder === 'descend'
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
import NIcon from '../../../icon'

export default {
  name: 'SortIcon',
  components: {
    NIcon,
    ArrowDownIcon
  },
  inject: {
    NDataTable: {
      default: null
    }
  },
  props: {
    fontSize: {
      type: Number,
      default: 17
    },
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
    currentColumnActive () {
      return this.activeSorter && this.activeSorter.columnKey === this.column.key
    },
    syntheticSortOrder () {
      if (this.activeSorter) {
        return this.activeSorter.order
      }
      return false
    }
  }
}
</script>
