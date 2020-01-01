<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-24 15:16:41
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-06 13:34:35
 -->
<template>
  <div
    ref="header"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :style="headerStyle"
    class="n-data-table-base-table-header"
    @scroll="handleScroll"
  >
    <table
      cellspacing="0"
      :style="{
        width: headerStyleWidth
      }"
    >
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :style="createCustomWidthStyle(column, index, placement)"
        >
      <!-- <col v-if="scrollBarWidth" :width="scrollBarWidth" > -->
      </colgroup>
      <thead>
        <tr>
          <template v-for="(column, i) in columns">
            <th
              :key="column.key"
              :style="{
                textAlign: column.align || null,
                height: height && `${height}px`
              }"
              :class="{
                'n-data-table__sortable-column': column.sortable,
                'n-data-table__td-text': column.ellipsis,
                'n-data-table__td-text--ellipsis': column.ellipsis
              }"
              @click.self="() => sortByColumn(column)"
            >
              <!-- 当前页全选 -->
              <n-checkbox
                v-if="column.type === 'selection'"
                :checked="$tableStore.state.selectedAllChecked"
                :indeterminate="isCheckedBoxAllIndeterminate"
                @change="selectedAllCheckedChange"
                @click.native="handleCheckboxClick"
              />
              <row
                v-else
                :index="i"
                :key-name="column.key || i"
                :row="column"
                :title="column.title"
                :column="column"
                :render="column.renderHeader"
              />
              <!-- {{ !column.renderHeader ? column.title : "" }} -->
              <SortIcon
                v-if="column.sortable"
                :ref="'sorter_' + (column.key || i)"
                :value="sortIndexes[column.key || i]"
                class="n-data-table__header-icon"
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
                  column.filterable &&
                    (column.filterItems || column.asyncFilterItems)
                "
                v-model="selectedFilter[column.key]"
                class="n-data-table__header-icon"
                :column="column"
                :items="column.filterItems || column.asyncFilterItems"
                @filter="onFilter"
              />
            </th>
          </template>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import row from '../row/index.js'
import SortIcon from '../sortIcon'
import PopFilter from '../popFilter'
import { createCustomWidthStyle } from '../utils'
import { storageMixin } from '../store'
import themeable from '../../../mixins/themeable'
import withapp from '../../../mixins/withapp'

export default {
  components: {
    row,
    SortIcon,
    PopFilter
  },
  mixins: [withapp, themeable, storageMixin],
  props: {
    placement: {
      type: String,
      default: null
    },
    scrollX: {
      type: Number,
      default: null
    },
    currentPageSelected: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: null
    },
    columns: {
      type: Array,
      default: () => []
    },
    sortIndexes: {
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
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPageAllSelect: false
    }
  },
  computed: {
    headerStyleWidth () {
      return this.scrollX && `${this.scrollX}px`
    },
    headerStyle () {
      return {
        overflow: !this.fixed ? 'scroll' : 'hidden'
      }
    },
    isCheckedBoxAllIndeterminate () {
      return (
        this.currentPageSelected !== this.showingData.length &&
        this.showingData.length !== 0 &&
        this.currentPageSelected !== 0
      )
    },
    currentKey () {
      let currentKey = ''
      Object.keys(this.sortIndexes).forEach(key => {
        if (this.sortIndexes[key] !== null) {
          currentKey = key
        }
      })
      // console.log('TCL: currentKey -> currentKey', currentKey)
      return currentKey
    }
  },
  methods: {
    handleScroll (e) {
      this.$emit('scroll', e)
    },
    sortInput (value, column, sorter) {
      const sortIndexes = {}
      sortIndexes[column.key] = value
      // console.log('TCL: sortInput -> value', sortIndexes)
      this.$emit('sort-change', sortIndexes)
    },
    sortByColumn (column) {
      if (!column.sortable || column.key === void 0) return
      const ref = this.$refs['sorter_' + column.key][0]
      ref.changeSort()
      // this.$set(this.sortIndexes, column.key, value)
    },
    createCustomWidthStyle: createCustomWidthStyle,
    handleCheckboxClick () {
      this.$emit('check-all', this.currentPageAllSelect)
    },
    selectedAllCheckedChange (v) {
      this.$tableStore.commit('selectedAllChecked', v)
    },
    onFilter (value, column) {
      this.$emit('filter', value, column)
    }
  }
}
</script>
