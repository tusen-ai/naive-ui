<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-23 16:06:59
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-07 16:17:14
 -->
<template>
  <n-scrollbar
    ref="scrollbar"
    class="n-data-table-base-table-body"
    :style="tbodyStyle"
    :content-style="{
      width: contentStyleWidth
    }"
    :horizontal-rail-style="{ zIndex: 1 }"
    :vertical-rail-style="{ zIndex: 1 }"
    :show-rail="!fixed"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @scroll="handleScroll"
  >
    <table cellspacing="0">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :style="createCustomWidthStyle(column, index, placement)"
        >
      </colgroup>
      <tbody>
        <template v-if="showingData.length === 0">
          <tr>
            <td v-for="column in columns" :key="column.key" />
          </tr>
        </template>
        <tr
          v-for="(rowData, i) in showingData"
          :key="i"
          class="n-data-table-tr"
          :style="{
            height: trHeight && trHeight + 'px'
          }"
          :class="
            typeof rowClassName === 'function'
              ? rowClassName(rowData, i)
              : rowClassName
          "
          @mouseenter="e => onRowHover(e, rowData, i)"
          @mouseleave="e => onRowLeave(e, rowData, i)"
        >
          <template v-for="column in columns">
            <td
              :key="column.key"
              :style="{
                textAlign: column.align || null
              }"
              :class="createTdClass(column, rowData)"
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
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </n-scrollbar>
</template>

<script>
import row from '../row/index.js'
import { addClass, removeClass, createCustomWidthStyle } from '../utils'
import { storageMixin } from '../store'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import NScrollbar from '../../Scrollbar'

export default {
  components: {
    NScrollbar,
    row
  },
  mixins: [ withapp, themeable, storageMixin ],
  props: {
    placement: {
      type: String,
      default: null
    },
    scrollX: {
      type: Number,
      default: null
    },
    fixed: {
      type: Boolean,
      default: false
    },
    trHeight: {
      type: Number,
      default: null
    },
    minHeight: {
      type: Number,
      default: null
    },
    tbodyWrapperOffsetHeight: {
      type: Number,
      default: null
    },
    bodyStyle: {
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
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    contentStyleWidth () {
      return this.scrollX && `${this.scrollX}px`
    },
    tbodyStyle () {
      if (this.fixed && this.height) {
        return Object.assign({}, this.bodyStyle, {
          height: this.height + 'px',
          minHeight: this.minHeight + 'px'
        })
      } else {
        return this.bodyStyle
      }
    }
  },
  watch: {
    '$tableStore.state.currentHoverRow' (index, oldIndex) {
      const hoverClassName = 'n-data-table-tr--hover'
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
  methods: {
    getScrollContainer () {
      return this.$refs.scrollbar.$refs.scrollContainer
    },
    handleMouseEnter (e) {
      this.$tableStore.commit('currentTableEl', e.currentTarget)
    },
    handleMouseLeave (e) {
      this.$tableStore.commit('currentTableEl', null)
    },
    onRowHover (e, rowData, index) {
      this.$tableStore.commit('currentHoverRow', index)
    },
    onRowLeave (e, rowData) {
      this.$tableStore.commit('currentHoverRow', null)
    },
    createCustomWidthStyle: createCustomWidthStyle,
    createTdClass (column, params) {
      let className = {}
      if (column.ellipsis) {
        className['n-data-table__td-text'] = true
        className['n-data-table__td-text--ellipsis'] = true
      }
      if (!column.className) {
        return className
      }
      if (typeof column.className === 'string') {
        className[column.className] = true
      } else if (typeof column.className === 'function') {
        column.className(column, params).forEach(name => {
          className[name] = true
        })
      }
      // console.log(className)
      return className
    },
    handleScroll (event) {
      this.$emit('scroll', event)
    }
  }
}
</script>
