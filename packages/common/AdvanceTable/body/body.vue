<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-23 16:06:59
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-07 16:17:14
 -->
<template>
  <!-- table body -->
  <n-table
    ref="nTable"
    :style="computeTbodyStl"
    style="border-top-left-radius:0;border-top-right-radius:0;box-sizing: border-box;"
    class="n-advance-table__body"
    @scroll.native="onBodyScrolll"
    @mouseenter.native="onMouseEnter"
    @mouseleave.native="onMouseLeave"
  >
    <colgroup>
      <col
        v-for="(column, i) in columns"
        :key="i"
        :style="computeCustomWidthStl(column)"
      >
    </colgroup>
    <n-tbody>
      <template v-if="showingData.length === 0">
        <n-tr>
          <n-td v-for="column in columns" :key="column.key" />
        </n-tr>
      </template>
      <n-tr
        v-for="(rowData, i) in showingData"
        :key="i"
        :style="computeTrStl"
        :class="
          typeof rowClassName === 'function'
            ? rowClassName(rowData, i)
            : rowClassName
        "
        @mouseenter.native="e => onRowHover(e, rowData, i)"
        @mouseleave.native="e => onRowLeave(e, rowData, i)"
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
              :column="column"
            />
          </n-td>
        </template>
      </n-tr>
    </n-tbody>
    <!-- <div
      v-if="scrollBarHorizontalHeight"
      class="n-advance-table-scroll-bar-placeholder"
      :style="{ height: scrollBarHorizontalHeight + 'px' }"
    /> -->
  </n-table>
</template>

<script>
import row from '../row/index.js'
import { addClass, removeClass } from '../utils'
import { storageMixin } from '../store'

export default {
  components: {
    row
  },
  mixins: [storageMixin],
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    trHeight: {
      type: Number,
      default: 0
    },
    minHeight: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    tbodyWrapperOffsetHeight: {
      type: Number,
      default: 0
    },
    scrollBarHorizontalHeight: {
      type: Number,
      default: 0
    },
    scrollBarVerticalWidth: {
      type: [Number, String],
      default: 0
    },
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
  computed: {
    computeTrStl () {
      return {
        height: this.trHeight ? this.trHeight + 'px' : null
      }
    },
    computeTbodyStl () {
      if (this.fixed && this.height) {
        return Object.assign({}, this.tableStl, {
          height: this.height + 'px',
          minHeight: this.minHeight + 'px',
          marginRight: this.scrollBarVerticalWidth
            ? -this.scrollBarVerticalWidth + 'px'
            : null
        })
      } else {
        return this.tableStl
      }
    }
  },
  watch: {
    '$store.state.currentHoverRow' (index, oldIndex) {
      const hoverClassName = 'n-table__tr--hover'
      const rowsDom = this.$el.querySelectorAll('table tr')
      const oldRowDom = rowsDom[oldIndex]
      const newRowDom = rowsDom[index]
      window.requestAnimationFrame(() => {
        if (oldRowDom) {
          removeClass(oldRowDom, hoverClassName)
        }
        if (newRowDom) {
          addClass(newRowDom, hoverClassName)
        }
      })
    }
  },
  mounted () {
    if (this.headerRefName) {
      let headerRef = this.$parent.$refs[this.headerRefName]
      this.headerRealEl = headerRef.$el.querySelector('thead')
    }
  },
  methods: {
    onMouseEnter (e) {
      this.$store.commit('currentTableEl', e.currentTarget)
    },
    onMouseLeave (e) {
      this.$store.commit('currentTableEl', null)
    },
    onRowHover (e, rowData, index) {
      this.$store.commit('currentHoverRow', index)
    },
    onRowLeave (e, rowData) {
      this.$store.commit('currentHoverRow', null)
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
        className.push('n-advance-table__td-text')
        className.push('n-advance-table__td-text--ellipsis')

        //  'n-advance-table__td-text': true,
        //     'n-advance-table__td-text--ellipsis': column.ellipsis
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
