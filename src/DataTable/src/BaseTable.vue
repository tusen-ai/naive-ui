<template>
  <div class="n-data-table-base-table-wrapper">
    <table-header
      ref="header"
      :placement="placement"
      :height="headerHeight"
      :columns="columns"
      :data="data"
      :fixed="fixed"
      :scroll-x="scrollX"
      @scroll="handleHeaderScroll"
      @set-active="setActive"
    />
    <table-body
      ref="body"
      :main="main"
      :placement="placement"
      :body-style="bodyStyle"
      :scroll-x="scrollX"
      :data="data"
      :columns="columns"
      :row-class-name="rowClassName"
      :min-height="bodyMinHeight"
      :tr-heights="trHeights"
      :loading="loading"
      :fixed="fixed"
      @scroll="handleBodyScroll"
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
    bodyMinHeight: {
      type: Number,
      default: null
    },
    headerHeight: {
      type: Number,
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
    trHeights: {
      type: Array,
      default: null
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
    handleBodyScroll (...args) {
      this.$emit('scroll', ...args)
    },
    handleHeaderScroll (...args) {
      this.$emit('header-scroll', ...args)
    },
    setActive (activeLeft, activeRight) {
      this.$refs.body.activeLeft = activeLeft
      this.$refs.body.activeRight = activeRight
    }
  }
}
</script>
