<template>
  <div class="n-data-table-base-table" :style="bodyStyle">
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
    bodyStyle: {
      type: Object,
      default: () => ({})
    },
    rowClassName: {
      type: [Function, String],
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
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
    }
  }
}
</script>
