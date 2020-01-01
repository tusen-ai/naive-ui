<template>
  <div class="n-data-table-base-table-wrapper">
    <table-header
      ref="header"
      :placement="placement"
      :height="headerHeight"
      :columns="columns"
      :sort-indexes="sortIndexes"
      :selected-filter="selectedFilter"
      :showing-data="showingData"
      :current-page-selected="currentPageSelectedLen"
      :fixed="fixed"
      :scroll-x="scrollX"
      @scroll="handleHeaderScroll"
      @check-all="handleCheckboxClick"
      @sort-change="onSortChange"
      @filter="onFilter"
    />
    <table-body
      ref="body"
      :placement="placement"
      :body-style="bodyStyle"
      :scroll-x="scrollX"
      :showing-data="showingData"
      :columns="columns"
      :row-class-name="rowClassName"
      :check-boxes="checkBoxes"
      :disabled-check-box="disabledCheckBox"
      :min-height="bodyMinHeight"
      :tr-height="trHeight"
      :loading="loading"
      :fixed="fixed"
      @scroll="handleBodyScroll"
    />
    <slot />
  </div>
</template>

<script>
import TableHeader from '../header/header'
import TableBody from '../body/body'
import { storageMixin } from '../store'

export default {
  components: {
    TableHeader,
    TableBody
  },
  mixins: [storageMixin],
  props: {
    placement: {
      type: String,
      default: null
    },
    scrollX: {
      type: Number,
      default: null
    },
    bodyMinHeight: {
      type: Number,
      default: null
    },
    currentPageSelectedLen: {
      type: Number,
      default: 0
    },
    currentPageSelected: {
      type: Number,
      default: 0
    },
    headerHeight: {
      type: Number,
      default: null
    },
    columns: {
      type: Array,
      default: () => []
    },
    sortIndexes: {
      type: Object,
      default: () => ({})
    },
    selectedFilter: {
      type: Object,
      default: () => ({})
    },
    showingData: {
      type: Array,
      default: () => []
    },
    fixed: {
      type: Boolean,
      default: false
    },
    trHeight: {
      type: Number,
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
  methods: {
    getHeaderElement () {
      return this.$refs.header.$el
    },
    getBodyElement () {
      return this.$refs.body.getScrollContainer()
    },
    handleCheckboxClick (...args) {
      this.$emit('check-all', ...args)
    },
    onSortChange (...args) {
      this.$emit('sort-change', ...args)
    },
    onFilter (...args) {
      this.$emit('filter', ...args)
    },
    handleBodyScroll (...args) {
      this.$emit('scroll', ...args)
    },
    handleHeaderScroll (...args) {
      this.$emit('header-scroll', ...args)
    }
  }
}
</script>
