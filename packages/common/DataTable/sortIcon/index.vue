<template>
  <span class="ts-sort-container">
    <n-icon
      :size="fontSize"
      :style="{
        opacity: arrowOpacity.desc
      }"
      @click.stop="setSorter(-1)"
    >
      <md-arrow-dropdown />
    </n-icon>
    <n-icon
      type="md-arrow-dropup"
      :size="fontSize"
      :style="{
        opacity: arrowOpacity.asc
      }"
      @click.stop="setSorter(1)"
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
    isSorterActive () {
      if (this.activeSorter && (this.activeSorter.columnKey === this.column.key)) {
        return {
          asc: this.activeSorter.order === 1,
          desc: this.activeSorter.order === -1
        }
      }
      return {
        asc: false,
        desc: false
      }
    },
    arrowOpacity () {
      if (!this.activeSorter || (this.activeSorter.columnKey !== this.column.key)) {
        return {
          asc: 0.4,
          desc: 0.4
        }
      }
      return {
        asc: this.activeSorter.order === 1 ? 1 : 0.4,
        desc: this.activeSorter.order === -1 ? 1 : 0.4
      }
    }
  },
  methods: {
    setSorter (order) {
      if ((this.isSorterActive.asc && order === 1) || (this.isSorterActive.desc && order === -1)) {
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
