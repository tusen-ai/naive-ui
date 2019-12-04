<template>
  <div>
    <table-header
      ref="header"
      :height="headerHeight"
      :columns="columns"
      :col-group-stl="colGroupStl"
      :sort-indexs="sortIndexs"
      :selected-filter="selectedFilter"
      :showing-data="showingData"
      :scroll-bar-width="scrollBarVerticalWidth"
      :current-page-selected="currentPageSelectedLen"
      :fixed="fixed"
      @on-checkbox-all="onAllCheckboxesClick"
      @on-sort-change="onSortChange"
      @on-filter="onFilter"
    />
    <table-body
      ref="tbody"
      :table-stl="tableStl"
      :showing-data="showingData"
      :columns="columns"
      :row-class-name="rowClassName"
      :check-boxes="checkBoxes"
      :disabled-check-box="disabledCheckBox"
      :header-ref-name="'header'"
      :scroll-bar-vertical-width="scrollBarVerticalWidth"
      :height="tbodyHeight"
      :min-height="bodyMinHeight"
      :tr-height="trHeight"
      :loading="loading"
      :fixed="fixed"
      @on-scroll="onBodyScrolll"
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
    bodyMinHeight: {
      type: Number,
      default: 0
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
    tbodyHeight: {
      type: Number,
      default: 0
    },
    colGroupStl: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    },
    sortIndexs: {
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
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    tbodyWrapperOffsetHeight: {
      type: Number,
      default: 0
    },
    scrollBarHorizontalHeight: {
      type: Number,
      default: 0
    },
    scrollBarVerticalWidth: {
      type: [Number, String],
      default: 0
    },
    tableStl: {
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
    headerRefName: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onAllCheckboxesClick (...args) {
      this.$emit('on-checkbox-all', ...args)
    },
    onSortChange (...args) {
      this.$emit('on-sort-change', ...args)
    },
    onFilter (...args) {
      this.$emit('on-filter', ...args)
    },
    onBodyScrolll (...args) {
      this.$emit('on-scroll', ...args)
    }
  }
}
</script>

<style>
</style>
