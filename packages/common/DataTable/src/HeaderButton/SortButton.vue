<template>
  <span>
    <span
      :style="{
        opacity: arrowOpacity.desc
      }"
      @click="setSorter('descend')"
    >
      DESC
    </span>
    <span
      :style="{
        opacity: arrowOpacity.asc
      }"
      @click="setSorter('ascend')"
    >
      ASC
    </span>
  </span>
</template>

<script>
function getNextOrderOf (order) {
  if (!order) return 'ascend'
  else if (order === 'ascend') return 'descend'
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
  name: 'SortIcon',
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
      const activeSorter = this.NDataTable.synthesizedActiveSorter
      if (activeSorter && activeSorter.columnKey === this.column.key) {
        return activeSorter
      }
      return null
    },
    synthesizedSortOrder () {
      if (this.activeSorter) {
        return this.activeSorter.order
      }
      return false
    },
    synthesizedColumnSorter () {
      return this.column.sorter || null
    },
    arrowOpacity () {
      return {
        asc: (this.activeSorter && this.synthesizedSortOrder === 'ascend') ? 1 : 0.4,
        desc: (this.activeSorter && this.synthesizedSortOrder === 'descend') ? 1 : 0.4
      }
    }
  },
  methods: {
    setSorter (order) {
      const nextSorter = createNextSorter(this.column.key, this.activeSorter, this.synthesizedColumnSorter)
      this.NDataTable.changeSorter(nextSorter)
    }
  }
}
</script>
