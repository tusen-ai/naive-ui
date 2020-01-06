<template>
  <n-scrollbar
    ref="scrollbar"
    class="n-data-table-base-table-body"
    :style="style"
    :content-style="{
      width: contentStyleWidth
    }"
    :horizontal-rail-style="{ zIndex: 1 }"
    :vertical-rail-style="{ zIndex: 1 }"
    :show-rail="!fixed"
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
        <template v-if="data.length === 0">
          <tr>
            <td v-for="column in columns" :key="column.key" />
          </tr>
        </template>
        <tr
          v-for="(rowData, index) in data"
          :key="index"
          class="n-data-table-tr"
          :style="{
            height: trHeight && trHeight + 'px'
          }"
          :class="Object.assign(
            {
              'n-data-table-tr--hover': hoveringRowIndex === index
            },
            createClassObject(typeof rowClassName === 'function'
              ? createClassObject(rowClassName(rowData, index))
              : rowClassName)
          )"
          @mouseenter="handleTrMouseEnter(index)"
          @mouseleave="handleTrMouseLeave"
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
                v-if="column.type === 'selection'"
                :disabled="column.disabled && column.disabled(rowData)"
                :checked="checkedRows.includes(rowData)"
                @input="checked => handleCheckboxInput(rowData, checked)"
              />
              <cell
                v-else
                :index="index"
                :row="rowData"
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
import cell from './Cell.vue'
import { createCustomWidthStyle, setCheckStatusOfRow, createClassObject } from '../utils'
import NScrollbar from '../../../Scrollbar'

export default {
  components: {
    NScrollbar,
    cell
  },
  inject: {
    NDataTable: {
      default: null
    }
  },
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
    bodyStyle: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    rowClassName: {
      type: [Function, String],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hoveringRowIndex () {
      return this.NDataTable.hoveringRowIndex
    },
    checkedRows () {
      return this.NDataTable.checkedRows
    },
    contentStyleWidth () {
      return this.scrollX && `${this.scrollX}px`
    },
    style () {
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
  methods: {
    createClassObject,
    handleCheckboxInput (row, checked) {
      setCheckStatusOfRow(this.NDataTable.checkedRows, row, checked)
    },
    getScrollContainer () {
      return this.$refs.scrollbar.$refs.scrollContainer
    },
    handleTrMouseEnter (index) {
      this.NDataTable.hoveringRowIndex = index
    },
    handleTrMouseLeave () {
      this.NDataTable.hoveringRowIndex = null
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
