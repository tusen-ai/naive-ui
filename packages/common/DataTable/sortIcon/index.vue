<template>
  <span class="ts-sort-container">
    <n-icon
      :size="fontSize"
      :style="{
        opacity: arrowOpacity.desc
      }"
      @click.stop="setSorter('descend')"
    >
      <md-arrow-dropdown />
    </n-icon>
    <n-icon
      type="md-arrow-dropup"
      :size="fontSize"
      :style="{
        opacity: arrowOpacity.asc
      }"
      @click.stop="setSorter('ascend')"
    >
      <md-arrow-dropup />
    </n-icon>
  </span>
</template>
<script>
import mdArrowDropdown from 'naive-ui/lib/icons/md-arrow-dropdown'
import mdArrowDropup from 'naive-ui/lib/icons/md-arrow-dropup'

export default {
  name: 'SortIcon',
  components: {
    mdArrowDropdown,
    mdArrowDropup
  },
  props: {
    fontSize: {
      type: Number,
      default: 17
    },
    activeSorter: {
      type: Object,
      default: null
    },
    column: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasControlledSortOrder () {
      return this.column.sortOrder !== undefined
    },
    controlledSortOrder () {
      if (this.column.sortOrder) return this.column.sortOrder
      return null
    },
    isSorterActive () {
      if (this.hasControlledSortOrder) {
        if (this.controlledSortOrder === null) {
          return {
            asc: false,
            desc: false
          }
        }
        if (this.controlledSortOrder) {
          return {
            asc: this.controlledSortOrder === 'ascend',
            desc: this.controlledSortOrder === 'descend'
          }
        }
      }
      if (this.activeSorter && (this.activeSorter.columnKey === this.column.key)) {
        return {
          asc: this.activeSorter.order === 'ascend',
          desc: this.activeSorter.order === 'descend'
        }
      }
      return {
        asc: false,
        desc: false
      }
    },
    arrowOpacity () {
      return {
        asc: this.isSorterActive.asc ? 1 : 0.4,
        desc: this.isSorterActive.desc ? 1 : 0.4
      }
    }
  },
  methods: {
    setSorter (order) {
      if ((this.isSorterActive.asc && order === 'ascend') || (this.isSorterActive.desc && order === 'descend')) {
        this.$emit('sorter-change', null)
      } else {
        this.$emit('sorter-change', {
          columnKey: this.column.key,
          sorter: this.column.sorter || null,
          order
        })
      }
    }
  }
}
</script>
