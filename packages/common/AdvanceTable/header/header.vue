<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-24 15:16:41
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-06 13:34:35
 -->
<template>
  <n-table
    ref="header"
    style="padding:0;border-bottom-left-radius:0;border-bottom-right-radius:0;"
    :style="colGroupStl"
    class="n-advance-table__header"
  >
    <colgroup>
      <col
        v-for="(column, i) in columns"
        :key="i"
        :style="computeCustomWidthStl(column)"
      />

      <col v-if="scrollBarWidth" :width="scrollBarWidth" />
    </colgroup>
    <n-thead>
      <n-tr>
        <template v-for="(column, i) in columns">
          <n-th
            ref="theads"
            :key="column.key"
            :style="computeAlign(column)"
            :class="{
              'n-advance-table__sortable-column': column.sortable
            }"
            @click.native.self="() => sortByColumn(column)"
          >
            <!-- 当前页全选 -->
            <n-checkbox
              v-if="column.type === 'selection'"
              v-model="currentPageAllSelect"
              :indeterminate="!isCheckedBoxAllIndeterminate"
              @click.native="onAllCheckboxesClick"
            />
            <row
              v-if="column.renderHeader"
              :index="i"
              :row="column"
              :key-name="column.key || i"
              :render="column.renderHeader"
            />
            {{ !column.renderHeader ? column.title : "" }}
            <SortIcon
              v-if="column.sortable"
              :ref="'sorter_' + (column.key || i)"
              :value="sortIndexs[column.key || i]"
              class="n-advance-table__header-icon"
              :column="column"
              :index="i"
              :current-key="currentKey"
              @input="sortInput"
            />

            <!-- 优先自定义 -->
            {{ column.filterDropdown && column.filterDropdown() }}
            <!-- 否则默认渲染 -->
            <PopFilter
              v-if="
                column.onFilter &&
                  (column.filterItems || column.asyncFilterItems)
              "
              v-model="selectedFilter[column.key]"
              class="n-advance-table__header-icon"
              :column="column"
              :items="column.filterItems || column.asyncFilterItems"
              @on-filter="onFilter"
            />
          </n-th>
        </template>
        <span
          v-if="scrollBarWidth"
          :style="
            'padding-left:' + scrollBarWidth + 'px;' + 'visibility:hidden;'
          "
          rowspan="1"
        />
      </n-tr>
    </n-thead>
  </n-table>
</template>

<script>
import row from '../row/index.js'
import SortIcon from '../sortIcon'
import PopFilter from '../popFilter'

export default {
  components: {
    row,
    SortIcon,
    PopFilter
  },
  props: {
    currentPageSelected: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: null
    },
    colGroupStl: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    },
    scrollBarWidth: {
      type: [Number, String],
      default: 0
    },
    sortIndexs: {
      type: Object,
      default: () => ({})
    },
    selectedFilter: {
      type: Object,
      default: () => ({})
    },
    showingData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentPageAllSelect: false
    }
  },
  computed: {
    isCheckedBoxAllIndeterminate () {
      return (
        this.currentPageSelected === this.showingData.length ||
        this.currentPageSelected === 0
      )
    },
    currentKey () {
      let currentKey = ''
      Object.keys(this.sortIndexs).forEach(key => {
        if (this.sortIndexs[key] !== null) {
          currentKey = key
        }
      })
      // console.log('TCL: currentKey -> currentKey', currentKey)
      return currentKey
    }
  },
  methods: {
    onCheckBoxChange (v) {
      this.$emit('on-checkbox-all-change', v)
    },
    computeAlign (column) {
      let stl = {}

      if (column.align) {
        Object.assign(stl, {
          'text-align': column.align
        })
      }
      let height = this.height
      console.log('TCL: computeAlign -> this.height', this.height)
      if (height !== null) {
        stl.height = `${height}px`
      }
      return stl
    },
    sortInput (value, column, sorter) {
      const sortIndexs = {}
      sortIndexs[column.key] = value
      // console.log('TCL: sortInput -> value', sortIndexs)
      this.$emit('on-sort-change', sortIndexs)
    },
    sortByColumn (column) {
      if (!column.sortable || column.key === void 0) return
      const ref = this.$refs['sorter_' + column.key][0]
      ref.changeSort()
      // this.$set(this.sortIndexs, column.key, value)
    },
    computeCustomWidthStl (column) {
      if (column.width) {
        let width = column.width
        return {
          width: width + 'px',
          'padding-right': this.scrollBarWidth + 'px'
          // minWidth: width + 'px'
        }
      } else if (column.type === 'selection') {
        let width = 60
        return {
          width: width + 'px',
          'padding-right': this.scrollBarWidth + 'px'
          // minWidth: width + 'px'
        }
      }
      return null
    },
    clearOtherSort (notClearKey) {
      const sortIndexs = {}
      Object.keys(this.sortIndexs).forEach(key => {
        if (key !== notClearKey) sortIndexs[key] = null
      })
      return sortIndexs
    },
    onAllCheckboxesClick () {
      this.$emit('on-checkbox-all', this.currentPageAllSelect)
    },
    onFilter (value, column) {
      this.$emit('on-filter', value, column)
    }
  }
}
</script>

<style>
</style>
