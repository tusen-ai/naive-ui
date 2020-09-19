<template>
  <div class="n-data-table-base-table">
    <table-header
      ref="header"
      :placement="placement"
      :columns="columns"
      :data="data"
      :fixed="fixed"
      :scroll-x="scrollX"
      @set-active-fixed-column="setActiveFixedColumn"
    />
    <table-body
      ref="body"
      :style="bodyStyle"
      :main="main"
      :placement="placement"
      :scroll-x="scrollX"
      :data="data"
      :columns="columns"
      :row-class-name="rowClassName"
      :loading="loading"
      :fixed="fixed"
    />
    <slot />
  </div>
</template>

<script>
import TableHeader from './TableParts/Header'
import TableBody from './TableParts/Body'
import resizeObserverDelegate from '../../_utils/delegate/resizeObserverDelegate'
import formatLength from '../../_utils/css/formatLength'

export default {
  components: {
    TableHeader,
    TableBody
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
    fixed: {
      type: Boolean,
      default: false
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
  data () {
    return {
      bodyMaxHeight: null,
      bodyMinHeight: null
    }
  },
  computed: {
    bodyStyle () {
      return {
        maxHeight: formatLength(this.bodyMaxHeight),
        minHeight: formatLength(this.bodyMinHeight)
      }
    }
  },
  mounted () {
    resizeObserverDelegate.registerHandler(
      this.getHeaderElement(),
      this.setBodyMinMaxHeight
    )
    this.setBodyMinMaxHeight()
  },
  beforeUnmount () {
    resizeObserverDelegate.unregisterHandler(
      this.getHeaderElement(),
      this.setBodyMinMaxHeight
    )
  },
  methods: {
    getHeaderElement () {
      return this.$refs.header.$el
    },
    getBodyElement () {
      return this.$refs.body.getScrollContainer()
    },
    setActiveFixedColumn (leftActiveFixedColumn, rightActiveFixedColumn) {
      this.$refs.body.activeLeft = leftActiveFixedColumn
      this.$refs.body.activeRight = rightActiveFixedColumn
    },
    setBodyMinMaxHeight () {
      const bordered = this.bordered
      const headerHeight = this.getHeaderElement().offsetHeight
      const maxHeight = this.maxHeight
      const minHeight = this.minHeight
      if (maxHeight !== null) {
        this.bodyMaxHeight = maxHeight + (bordered ? -2 : 0) - headerHeight
      }
      if (minHeight !== null) {
        this.bodyMinHeight = minHeight + (bordered ? -2 : 0) - headerHeight
      }
    }
  }
}
</script>
