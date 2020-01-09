<template>
  <n-scrollbar
    ref="scrollbar"
    class="n-data-table-base-table-body"
    :style="style"
    :content-style="{
      minWidth: scrollX && `${scrollX}px`
    }"
    :horizontal-rail-style="{ zIndex: 1 }"
    :vertical-rail-style="{ zIndex: 1 }"
    :show-rail="!fixed"
    @scroll="handleScroll"
  >
    <table class="n-data-table-table">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="index"
          :style="createCustomWidthStyle(column, index, placement)"
        >
      </colgroup>
      <tbody ref="tbody" class="n-data-table-tbody">
        <tr
          v-for="(rowData, index) in data"
          :key="index"
          class="n-data-table-tr"
          :style="{
            height: (!main || null) && (trHeights[index] && trHeights[index] + 'px')
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
              class="n-data-table-td"
              :class="{
                'n-data-table-td--ellipsis': column.ellipsis,
                [`n-data-table-td--${column.align}-align`]: column.align,
                ...(column.className && createClassObject(column.className))
              }"
            >
              <n-checkbox
                v-if="column.type === 'selection'"
                :key="currentPage"
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
import resizeObserverDelegate from '../../../../utils/delegate/resizeObserverDelegate'

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
    main: {
      type: Boolean,
      default: false
    },
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
    trHeights: {
      type: Array,
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
    currentPage () {
      const pagination = this.NDataTable.synthesizedPagination
      if (!pagination) return -1
      if (!pagination.page) return -1
      return pagination.page
    },
    hoveringRowIndex () {
      return this.NDataTable.hoveringRowIndex
    },
    checkedRows () {
      return this.NDataTable.checkedRows
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
  mounted () {
    if (this.main) {
      resizeObserverDelegate.registerHandler(this.$refs.tbody, this.handleTbodyResize)
      this.handleTbodyResize()
    }
  },
  beforeDestroy () {
    if (this.main) {
      resizeObserverDelegate.unregisterHandler(this.$refs.tbody)
    }
  },
  methods: {
    handleTbodyResize () {
      if (this.main) {
        this.NDataTable.collectDOMSizes()
      }
    },
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
    handleScroll (event) {
      this.$emit('scroll', event)
    }
  }
}
</script>
