<template>
  <n-scrollbar
    ref="scrollbar"
    class="n-data-table-base-table-body"
    :theme="NDataTable.syntheticTheme"
    :content-style="{
      minWidth: formatedScrollX
    }"
    :horizontal-rail-style="{ zIndex: 3 }"
    :vertical-rail-style="{ zIndex: 3 }"
    :show-rail="!fixed"
    @scroll="handleScroll"
  >
    <table ref="body" class="n-data-table-table">
      <colgroup>
        <col
          v-for="(column, index) in columns"
          :key="column.key"
          :style="createCustomWidthStyle(column, index, placement)"
        >
      </colgroup>
      <tbody ref="tbody" class="n-data-table-tbody">
        <tr
          v-for="(rowData, index) in data"
          :key="rowKey === null ? rowData.key : rowKey(rowData)"
          class="n-data-table-tr"
          :class="
            createClassObject(typeof rowClassName === 'function'
              ? createClassObject(rowClassName(rowData, index))
              : rowClassName)
          "
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{
              textAlign: column.align || null,
              left: NDataTable.currentFixedColumnLeft(column),
              right: NDataTable.currentFixedColumnRight(column)
            }"
            class="n-data-table-td"
            :class="{
              'n-data-table-td--ellipsis': column.ellipsis,
              [`n-data-table-td--${column.align}-align`]: column.align,
              ...(column.className && createClassObject(column.className)),
              [`n-data-table-td--fixed-${column.fixed}`]: column.width && column.fixed,
              'n-data-table-td--shadow-after': activeLeft[column.key],
              'n-data-table-td--shadow-before': activeRight[column.key],
              'n-data-table-td--selection': column.type === 'selection'
            }"
          >
            <n-checkbox
              v-if="column.type === 'selection'"
              :key="currentPage"
              :disabled="column.disabled && column.disabled(rowData)"
              :checked="checkedRowKeys.includes(createRowKey(rowData, rowKey))"
              @update:checked="checked => handleCheckboxInput(rowData, checked)"
            />
            <cell
              v-else
              :index="index"
              :row="rowData"
              :column="column"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </n-scrollbar>
</template>

<script>
import cell from './Cell.vue'
import { createCustomWidthStyle, setCheckStatusOfRow, createClassObject, createRowKey } from '../utils'
import NScrollbar from '../../../scrollbar'
import formatLength from '../../../_utils/css/formatLength'

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
      type: [Number, String],
      default: null
    },
    fixed: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: null
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
  data () {
    return {
      activeLeft: {},
      activeRight: {}
    }
  },
  computed: {
    formatedScrollX () {
      return formatLength(this.scrollX)
    },
    rowKey () {
      return this.NDataTable.rowKey
    },
    currentPage () {
      const pagination = this.NDataTable.syntheticPagination
      if (!pagination) return -1
      if (!pagination.page) return -1
      return pagination.page
    },
    checkedRowKeys () {
      return this.NDataTable.syntheticCheckedRowKeys
    }
  },
  methods: {
    createClassObject,
    createRowKey,
    handleCheckboxInput (row, checked) {
      const newCheckedRowKeys = this.checkedRowKeys.map(v => v)
      setCheckStatusOfRow(newCheckedRowKeys, row, checked, this.rowKey)
      this.NDataTable.changeCheckedRowKeys(newCheckedRowKeys)
    },
    getScrollContainer () {
      return this.$refs.scrollbar.$refs.scrollContainer
    },
    createCustomWidthStyle: createCustomWidthStyle,
    handleScroll (event) {
      this.NDataTable.handleTableBodyScroll(event)
    }
  }
}
</script>
