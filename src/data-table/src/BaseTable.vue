<template>
  <div class="n-data-table-base-table">
    <table-header
      ref="headerRef"
      :placement="placement"
      :columns="columns"
      :data="data"
      :scroll-x="scrollX"
      @update:active-fixed-column="setActiveFixedColumn"
    />
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
import { ref } from 'vue'
import TableHeader from './TableParts/Header.vue'
import TableBody from './TableParts/Body.vue'
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
    // BUG: beforeUnmount is called twice
    // wait for vue 3.0.1 to fix it
    resizeObserverDelegate.unregisterHandler(
      this.getHeaderElement()
    )
  },
  methods: {
    getHeaderElement () {
      return this.headerRef.$el
    },
    getBodyElement () {
      return this.bodyRef.getScrollContainer()
    },
    setActiveFixedColumn (leftActiveFixedColumn, rightActiveFixedColumn) {
      const { bodyRef } = this
      bodyRef.activeLeft = leftActiveFixedColumn
      bodyRef.activeRight = rightActiveFixedColumn
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
