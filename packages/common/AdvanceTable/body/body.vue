<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-23 16:06:59
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-10-24 15:55:27
 -->
<template>
  <!-- table body -->
  <n-table
    ref="nTable"
    :style="tableStl"
    style="border-top-left-radius:0;border-top-right-radius:0;"
    @scroll.native="onBodyScrolll"
  >
    <colgroup v-if="showingData.length !== 0">
      <col
        v-for="(column, i) in columns"
        :key="i"
        :style="computeCustomWidthStl(column)"
      />
    </colgroup>
    <n-tbody v-show="!loading">
      <n-tr
        v-for="(rowData, i) in showingData"
        :key="i"
        :class="
          typeof rowClassName === 'function'
            ? rowClassName(rowData, i)
            : rowClassName
        "
      >
        <template v-for="column in columns">
          <n-td
            :key="column.key"
            :style="computeAlign(column)"
            :class="computeTdClass(column, rowData)"
          >
            <!-- 批量选择 -->
            <n-checkbox
              v-if="
                column.type === 'selection' &&
                  (column.disabled && !column.disabled(rowData, i))
              "
              v-model="checkBoxes[rowData._index]"
            />
            <n-checkbox
              v-else-if="
                column.type === 'selection' &&
                  (column.disabled && column.disabled(rowData, i))
              "
              v-model="disabledCheckBox[rowData._index]"
              :disabled="!(disabledCheckBox[rowData._index] = false)"
            />
            <n-checkbox
              v-else-if="column.type === 'selection'"
              v-model="checkBoxes[rowData._index]"
            />
            <row
              v-else
              :index="i"
              :row="rowData"
              :key-name="column.key"
              :render="column.render"
            />
          </n-td>
        </template>
      </n-tr>
      <div v-if="showingData.length === 0" class="n-advance-table__no-data-tip">
        No data
      </div>
    </n-tbody>
    <template v-if="loading">
      <n-spin :spinning="loading" style="width:100%;display:table-caption;" />
    </template>
  </n-table>
</template>

<script>
import row from '../row/index.js'

export default {
  components: {
    row
  },
  props: {
    tableStl: {
      type: Object,
      default: () => ({})
    },
    showingData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    rowClassName: {
      type: [Function, String],
      default: ''
    },
    checkBoxes: {
      type: Array,
      default: () => []
    },
    disabledCheckBox: {
      type: Array,
      default: () => []
    },
    headerRefName: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  mounted () {
    if (this.headerRefName) {
      let headerRef = this.$parent.$refs[this.headerRefName]
      this.headerRealEl = headerRef.$el.querySelector('thead')
    }
  },
  methods: {
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
    computeAlign (column) {
      if (column.align) {
        return {
          'text-align': column.align
        }
      }
    },
    computeTdClass (column, params) {
      let className = []
      if (column.fixed) {
        className.push('n-advance-table__td--fixed')
      }
      if (column.ellipsis) {
        className.push('n-advanced-table__td-text--ellipsis')
      }
      if (!column.className) {
        return className
      }
      if (typeof column.className === 'string') {
        className.push(column.className)
      } else if (typeof column.className === 'function') {
        className.push(column.className(params))
      }
      // console.log(className)
      return className
    },
    onBodyScrolll (event) {
      this.$emit('on-scroll', event)
    }
  }
}
</script>

<style>
</style>
