<template>
  <div class="n-data-table-base-table">
    <v-resize-observer @resize="handleHeaderResize">
      <table-header
        ref="headerRef"
        :placement="placement"
        :columns="columns"
        :data="data"
        :scroll-x="scrollX"
        @scroll="handleHeaderScroll"
      />
    </v-resize-observer>
    <table-body
      ref="bodyRef"
      :style="bodyStyle"
      :main="main"
      :placement="placement"
      :scroll-x="scrollX"
      :data="data"
      :columns="columns"
      :row-class-name="rowClassName"
      :loading="loading"
    />
    <slot />
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { VResizeObserver } from 'vueuc'
import TableHeader from './TableParts/Header.vue'
import TableBody from './TableParts/Body.vue'
import { formatLength } from '../../_utils/css'

export default defineComponent({
  components: {
    VResizeObserver,
    TableHeader,
    TableBody
  },
  provide () {
    return {
      NBaseTable: this
    }
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
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: null
    },
    minHeight: {
      type: Number,
      default: null
    },
    rowClassName: {
      type: [Function, String],
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      required: true
    }
  },
  setup () {
    return {
      headerRef: ref(null),
      bodyRef: ref(null)
    }
  },
  data () {
    return {
      tableWidth: null,
      bodyMaxHeight: null,
      bodyMinHeight: null,
      leftActiveFixedColumn: {},
      rightActiveFixedColumn: {}
    }
  },
  computed: {
    bodyStyle () {
      return {
        maxHeight: formatLength(this.bodyMaxHeight),
        minHeight: formatLength(this.bodyMinHeight)
      }
    },
    fixedColumnsLeft () {
      const columnsLeft = {}
      let left = 0
      const columns = this.columns
      columns.map((column) => {
        if (this.NDataTable.leftFixedColumns.indexOf(column) > -1) {
          columnsLeft[column.key] = left
        }
        left = left + this.headerRef.$refs[column.key].offsetWidth
      })
      return columnsLeft
    },
    fixedColumnsRight () {
      const columnsRight = {}
      let right = 0
      const columns = this.columns
      for (let i = columns.length - 1; i >= 0; i--) {
        if (this.NDataTable.rightFixedColumns.indexOf(this.columns[i]) > -1) {
          columnsRight[columns[i].key] = right
        }
        right = right + this.headerRef.$refs[columns[i].key].offsetWidth
      }
      return columnsRight
    }
  },
  methods: {
    handleHeaderResize (entry) {
      this.setTableWidth(entry.contentRect.width)
      this.setBodyMinMaxHeight(entry.contentRect.height)
      this.setActiveLeftFixedColumn(entry.target)
      this.setActiveRightFixedColumn(entry.target)
    },
    handleHeaderScroll (e) {
      this.setActiveRightFixedColumn(e.target)
      this.setActiveLeftFixedColumn(e.target)
      this.NDataTable.handleTableHeaderScroll(e)
    },
    getHeaderElement () {
      return this.headerRef.$el
    },
    getBodyElement () {
      return this.bodyRef.getScrollContainer()
    },
    setTableWidth (width) {
      this.tableWidth = width
    },
    setBodyMinMaxHeight (headerHeight) {
      const bordered = this.bordered
      const maxHeight = this.maxHeight
      const minHeight = this.minHeight
      if (maxHeight !== null) {
        this.bodyMaxHeight = maxHeight + (bordered ? -2 : 0) - headerHeight
      }
      if (minHeight !== null) {
        this.bodyMinHeight = minHeight + (bordered ? -2 : 0) - headerHeight
      }
    },
    setActiveRightFixedColumn (target) {
      const rightFixedColumns = this.NDataTable.rightFixedColumns
      const scrollLeft = target.scrollLeft
      const { tableWidth } = this
      const scrollWidth = target.scrollWidth
      let rightWidth = 0
      const fixedColumnsRight = this.fixedColumnsRight
      const rightActiveFixedColumn = {}
      this.rightActiveFixedColumn = rightActiveFixedColumn
      for (let i = rightFixedColumns.length - 1; i >= 0; --i) {
        const key = rightFixedColumns[i].key
        if (
          scrollLeft + fixedColumnsRight[key] + tableWidth - rightWidth <
          scrollWidth
        ) {
          this.rightActiveFixedColumn = { [key]: true }
          rightWidth += rightFixedColumns[i].width
        } else {
          break
        }
      }
    },
    setActiveLeftFixedColumn (target) {
      const leftFixedColumns = this.NDataTable.leftFixedColumns
      const scrollLeft = target.scrollLeft
      let leftWidth = 0
      const fixedColumnsLeft = this.fixedColumnsLeft
      this.leftActiveFixedColumn = {}
      for (let i = 0; i < leftFixedColumns.length; ++i) {
        const key = leftFixedColumns[i].key
        if (scrollLeft > fixedColumnsLeft[key] - leftWidth) {
          this.leftActiveFixedColumn = { [key]: true }
          leftWidth += leftFixedColumns[i].width
        } else {
          break
        }
      }
    }
  }
})
</script>
