<template>
  <span
    class="n-data-table-sort-button"
    :class="{
      'n-data-table-sort-button--asc': currentColumnActive && synthesizedSortOrder === 'ascend',
      'n-data-table-sort-button--desc': currentColumnActive && synthesizedSortOrder === 'descend'
    }"
  >
    <n-icon
      class="n-data-table-sort-button__desc-icon"
    >
      <ios-arrow-down />
    </n-icon>
    <n-icon
      class="n-data-table-sort-button__asc-icon"
    >
      <ios-arrow-up />
    </n-icon>
  </span>
</template>

<script>
import iosArrowUp from '../../../../icons/ios-arrow-up'
import iosArrowDown from '../../../../icons/ios-arrow-down'
import NIcon from '../../../Icon'

export default {
  name: 'SortIcon',
  inject: {
    NDataTable: {
      default: null
    }
  },
  components: {
    NIcon,
    iosArrowUp,
    iosArrowDown
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
      const activeSorter = this.NDataTable.synthesizedActiveSorter
      return activeSorter
    },
    currentColumnActive () {
      return this.activeSorter && this.activeSorter.columnKey === this.column.key
    },
    synthesizedSortOrder () {
      if (this.activeSorter) {
        return this.activeSorter.order
      }
      return false
    }
  }
}
</script>
