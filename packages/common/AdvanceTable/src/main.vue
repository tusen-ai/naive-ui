<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-24 16:16:09
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-06 10:30:17
 -->
<template>
  <div
    ref="tableWrapper"
    class="n-advance-table__wrapper n-advance-table"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-advance-table--col-border': colBorder
    }"
  >
    <div class="n-advance-table__operation">
      <div class="n-advance-table__operation--left">
        <slot name="table-operation-batch-left" />
        <section class="n-advance-table__operation__bacth" />
        <slot name="table-operation-batch-right" />
      </div>
      <div
        class="n-advance-table__operation--right"
        :style="search ? 'margin-bottom: 18px;' : ''"
      >
        <slot name="table-operation" />
        <div v-if="search" class="n-advance-table__operation__search">
          <searchInput
            ref="search"
            :options="search"
            @on-change="handleSearch"
          />
        </div>
        <slot name="table-operation-search-right" />
      </div>
    </div>
    <div
      ref="tbodyWrapper"
      class="n-advance-table__tbody"
      :class="{
        'n-advance-table--no-data': showingData.length === 0
      }"
      :style="tableWrapperStl"
    >
      <div
        v-if="fixedLeftColumn.length"
        class="n-advance-table__fixed--left n-advance-table__fixed"
        :class="fixedLeftColumndClass"
      >
        <base-table
          ref="fixedLeftTable"
          :header-height="headerHeight"
          :columns="fixedLeftColumn"
          :col-group-stl="colGroup"
          :sort-indexs="sortIndexs"
          :selected-filter="selectedFilter"
          :showing-data="showingData"
          :current-page-selected="currentPageSelectedLen"
          :table-stl="tableStl"
          :row-class-name="rowClassName"
          :check-boxes="checkBoxes"
          :disabled-check-box="disabledCheckBox"
          header-ref-name="header"
          :scroll-bar-vertical-width="scrollBarWidth"
          :tbody-height="tbodyWrapperHeight"
          :tr-height="trHeight"
          :loading="loading"
          :fixed="true"
          @on-scroll="onBodyScrolll"
          @on-checkbox-all="onAllCheckboxesClick"
          @on-sort-change="onSortChange"
          @on-filter="onFilter"
        />
      </div>
      <!-- table head -->
      <base-table
        ref="mainTable"
        :table-stl="tableStl"
        :showing-data="showingData"
        :columns="columns"
        :row-class-name="rowClassName"
        :check-boxes="checkBoxes"
        :disabled-check-box="disabledCheckBox"
        :loading="loading"
        :col-group-stl="colGroup"
        :scroll-bar-width="scrollBarWidth"
        :sort-indexs="sortIndexs"
        :selected-filter="selectedFilter"
        :current-page-selected="currentPageSelectedLen"
        :body-min-height="42"
        @on-scroll="onBodyScrolll"
        @on-checkbox-all="onAllCheckboxesClick"
        @on-sort-change="onSortChange"
        @on-filter="onFilter"
      />
      <div
        v-if="fixedRightColumn.length"
        class="n-advance-table__fixed--right n-advance-table__fixed"
        :class="fixedRightColumndClass"
      >
        <base-table
          ref="fixedRightTable"
          :header-height="headerHeight"
          :columns="fixedRightColumn"
          :col-group-stl="colGroup"
          :sort-indexs="sortIndexs"
          :selected-filter="selectedFilter"
          :showing-data="showingData"
          :current-page-selected="currentPageSelectedLen"
          :table-stl="tableStl"
          :row-class-name="rowClassName"
          :check-boxes="checkBoxes"
          :disabled-check-box="disabledCheckBox"
          :tbody-height="tbodyWrapperHeight"
          :tr-height="trHeight"
          :loading="loading"
          :fixed="true"
          @on-scroll="onBodyScrolll"
          @on-checkbox-all="onAllCheckboxesClick"
          @on-sort-change="onSortChange"
          @on-filter="onFilter"
        />
      </div>

      <!-- loading -->
      <transition name="n-table-loading--transition">
        <div v-if="loading" class="n-advance-table__loading">
          <n-spin
            :spinning="true"
            style="width:100%;overflow:hidden;z-index:200;position:absolute;top:50%;"
          />
        </div>
      </transition>

      <div
        v-if="showingData.length === 0 && !loading"
        class="n-advance-table__no-data-tip"
      >
        No data
      </div>
    </div>
    <!-- 分页 -->
    <div
      v-if="pagination !== false && showingData.length"
      class="n-advance-table__pagination"
    >
      <n-pagination v-model="currentPage" :page-count="pageCount" />
    </div>
  </div>
</template>

<script>
import searchInput from '../searchInput'
import { noopFn } from '../../../utils/index'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import { Store, storageMixin } from '../store'
import BaseTable from '../baseTable/baseTable'

export default {
  store () {
    return new Store()
  },
  name: 'NAdvanceTable',
  components: {
    searchInput,
    BaseTable
  },
  mixins: [storageMixin, withapp, themeable],
  props: {
    search: {
      /**
       * @description if onSearch === 'custom' will exec this.onChange
       * columns:{label,value}
       * placeholder @description search input placeholder
       * onSearch @type Function | String 'custom' @returns Boolean, @description used in locale @example ( key, word,row)=>{return row.xxx.includes[word]}
       */
      type: [Object, Boolean],
      default: false
    },
    pagination: {
      /**
       * @description pagination === false will now show pagination
       *
       * @param {total,limit,custom}
       *
       * emit event => on-page-change
       *
       * and
       *
       * if(custom===true){
       *   exec this.props.onChange
       * }
       *
       *
       */
      type: [Object, Boolean],
      default: false
    },
    onChange: {
      type: Function,
      default: noopFn
    },
    minHeight: {
      type: [Number, String],
      default: 'unset'
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    maxWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // hoverColor: {
    //   default: '#323850',
    //   type: String
    // },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    rowClassName: {
      type: [Array, String, Object, Function],
      default: ''
    },
    loading: {
      type: [Boolean],
      default: false
    },
    colBorder: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      headerHeight: 0,
      copyData: [],
      sortIndexs: {},
      wrapperWidth: 'unset',
      tbodyWidth: 'auto;',
      scrollBarWidth: '0',
      searchData: [],
      currentFilterColumn: null,
      currentSearchColumn: null,
      currentPage: 1,
      selectedFilter: {},
      checkBoxes: [],
      disabledCheckBox: [],
      currentPageAllSelect: false,
      tbodyWrapperHeight: 0,
      trHeight: 0,
      horizontalScrollLeft: 0
    }
  },
  computed: {
    fixedLeftColumndClass () {
      return {
        'n-advance-table__fixed--active': this.horizontalScrollLeft > 0
      }
    },
    fixedRightColumndClass () {
      return {
        'n-advance-table__fixed--active': this.horizontalScrollLeft <= 0
      }
    },
    tableWrapperStl () {
      let stl = {}
      if (this.maxWidth) {
        stl.maxWidth =
          typeof this.maxWidth === 'number'
            ? this.maxWidth + 'px'
            : this.maxWidth
      }
      return stl
    },
    fixedLeftColumn () {
      return this.columns
        .filter(column => {
          return column.fixed === 'left'
        })
        .map(item => {
          return {
            ...item,
            fixed: false
          }
        })
    },
    fixedRightColumn () {
      return this.columns
        .filter(column => {
          return column.fixed === 'right'
        })
        .map(item => {
          return {
            ...item,
            fixed: false
          }
        })
    },
    currentSortColumn () {
      let sorterKey = null
      let i = 0
      console.log(this.sortIndexs)
      Object.keys(this.sortIndexs).forEach(key => {
        if (this.sortIndexs[key] !== null) {
          sorterKey = key
        }
      })
      if (!sorterKey) {
        return null
      }
      let sorterColumn = this.columns.find((column, idx) => {
        i = idx
        return column.key === sorterKey
      })
      if (!sorterColumn) {
        return null
      }
      return {
        sortable: sorterColumn.sortable,
        key: sorterKey,
        type: this.sortIndexs[sorterKey],
        column: sorterColumn,
        i
      }
    },
    paginationer () {
      if (this.pagination) {
        return {
          currentPage: this.currentPage,
          ...this.pagination
        }
      }
      return null
    },
    pageCount () {
      if (this.pagination) {
        // TODO: check count limit is exisit
        let total = this.pagination.total
        if (this.pagination.custom !== true) {
          total = this.searchData.length
        }
        return Math.ceil(total / this.pagination.limit) || 1
      }
      return 1
    },
    showingData () {
      let data = this.searchData
      if (data === null) {
        data = []
      } else if (!this.searchData.length) {
        data = this.copyData
      }
      data = this.computePageDivideData(data)
      return data
    },
    tableStl () {
      const stl = {
        ...this.colGroup
      }
      if (this.maxHeight) {
        stl.maxHeight =
          typeof this.maxHeight === 'number'
            ? this.maxHeight + 'px'
            : this.maxHeight
      }
      if (this.minHeight !== 'unset') {
        stl.minHeight =
          typeof this.minHeight === 'number'
            ? this.minHeight + 'px'
            : this.minHeight
      }
      return stl
    },
    colGroup () {
      let stl = {}
      if (this.maxWidth) {
        stl.maxWidth =
          typeof this.maxWidth === 'number'
            ? this.maxWidth + 'px'
            : this.maxWidth
      }
      return stl
    },
    headColWidth () {
      return (
        (this.wrapperWidth - this.scrollBarWidth) /
        this.columns.length
      ).toFixed(3)
    },
    colWidth () {
      return (
        (this.wrapperWidth - this.scrollBarWidth) /
        this.columns.length
      ).toFixed(3)
    },
    selectedRows () {
      return this.checkBoxes
        .map((isChecked, idx) => {
          if (isChecked && this.disabledCheckBox[idx] !== false) {
            return this.copyData[idx]
          }
        })
        .filter(item => item !== void 0)
    },
    currentPageSelectedLen () {
      let selectedLen = 0
      this.showingData.forEach(item => {
        let realIdx = item._index
        if (
          this.checkBoxes[realIdx] === true &&
          this.disabledCheckBox[realIdx] !== false
        ) {
          selectedLen++
        }
      })
      return selectedLen
    },
    isCheckedBoxAllIndeterminate () {
      if (
        this.currentPageSelectedLen !== this.showingData.length &&
        this.showingData.length !== 0 &&
        this.currentPageSelectedLen !== 0
      ) {
        return true
      }
      return false
    },
    allCheckboxesSelect: {
      get () {
        if (
          this.currentPageSelectedLen === this.showingData.length &&
          this.showingData.length !== 0
        ) {
          return true
        }
        return false
      }
    }
  },
  watch: {
    // allCheckboxesSelect (val) {
    //   this.currentPageAllSelect = val
    // },
    currentPage () {
      if (this.pagination.custom === true) {
        this.useRemoteChange()
      }
      // this.currentPageAllSelect = this.allCheckboxesSelect
      this.$emit('on-page-change', this.paginationer)
    },
    data () {
      this.initData()
      this.searchData = this.computeShowingData()
      this.searchDataNoSort = null
      this.checkBoxes = []
      this.disabledCheckBox = []
      this.currentPageAllSelect = false
      this.computeScollBar()
    },
    currentSearchColumn () {
      this.searchData = this.computeShowingData()
    },
    currentSortColumn (sorter, oldSorter) {
      this.searchData = this.computeShowingData()
      //  上次的若是为custom,本次为locale sort那么也需要触发useRemoteChange
      if (
        sorter.sortable === 'custom' ||
        (oldSorter && oldSorter.sortable === 'custom')
      ) {
        this.useRemoteChange()
      }
      this.$emit('on-sort-change', this.currentSortColumn)
    },
    checkBoxes () {
      this.$emit('on-selected-change', this.selectedRows)
    },
    selectedFilter: {
      deep: true,
      handler (val) {
        this.currentFilterColumn = null
        let keys = Object.keys(val)
        if (keys.length) {
          this.currentFilterColumn = {}
        }
        this.columns.forEach(column => {
          let key = column.key
          if (keys.includes(key) && val[key] && val[key].length !== 0) {
            // TODO: 未来版本单选将会返回一个数值而不是数组!
            console.warn(
              '[NAIVE-UI]: n-advance-table filter filterMultiple=false will return not a array in future'
            )
            this.currentFilterColumn[key] = {
              value: [].concat(val[key]),
              filterFn: column.onFilter
            }
          }
        })
      }
    },
    currentFilterColumn: {
      handler () {
        this.searchData = this.computeShowingData()
        console.log('currentFilterColumn')
        // because after filter length maybe change , so need to reset current page
        this.currentPage = 1
      },
      deep: true
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    // console.log(this.wrapperWidth, this.tbodyWidth)

    this.init()

    window.addEventListener('resize', this.init)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.init)
  },
  methods: {
    onBodyScrolll (event) {
      const currentEl = this.$store.state.currentTableEl
      const scrollEls = [
        this.fixedLeftTBodyEl,
        this.mainTBodyEl,
        this.fixedRightTBodyEl
      ]

      window.requestAnimationFrame(() => {
        if (currentEl === this.mainTBodyEl) {
          const left = currentEl.scrollLeft
          this.horizontalScrollLeft = left
          this.headerRealEl.style.transform = `translate3d(-${this.horizontalScrollLeft}px,0,0)`
        }
        scrollEls
          .filter(
            item => item !== currentEl && item !== null && item !== undefined
          )
          .forEach(el => {
            el.scrollTop = currentEl.scrollTop
          })
      })

      event.stopPropagation()
      event.preventDefault()
    },
    initData () {
      this.copyData = this.data.slice(0).map((row, idx) => {
        return {
          row,
          _index: idx
        }
      })
    },
    sortByColumn (column) {
      if (!column.sortable || column.key === void 0) return
      const ref = this.$refs['sorter_' + column.key][0]
      ref.changeSort()
    },
    clearSelect () {
      this.$nextTick(() => {
        this.checkBoxes = []
      })
    },
    selectRow (rowIndexs = []) {
      this.$nextTick(() => {
        if (rowIndexs === 'all') {
          this.showingData.forEach(item => {
            this.checkBoxes[item._index] = true
          })
          this.checkBoxes = [].concat(this.checkBoxes)
        } else {
          if (this.showingData.length > 0) {
            rowIndexs.forEach(idx => {
              if (this.showingData[idx]) {
                const realIdx = this.showingData[idx]._index
                this.checkBoxes[realIdx] = true
              }
            })
            this.checkBoxes = [].concat(this.checkBoxes)
          }
        }
      })
    },
    /**
     * {key:[value,value1],key1:[v1,v2]}
     * {key:value}
     * number
     * {key:value}
     */
    setParams ({ filter, sorter, page, searcher }) {
      if (sorter) {
        this.$set(this.sortIndexs, sorter.key, sorter.type)
      } else {
        // clear
        this.clearSort()
      }
      this.currentFilterColumn &&
        Object.keys(this.currentFilterColumn).forEach(key => {
          this.selectedFilter = {}
        })
      if (filter) {
        // ---- TODO: 未来版本将会去除这段代码,为了兼容老版本
        Object.keys(filter).forEach(key => {
          let column = this.columns.find(item => item.key === key)
          if (column && !column.filterMultiple) {
            if (filter[key].length) {
              filter[key] = filter[key][0]
            } else {
              delete filter[key]
            }
          }
        })
        // ----
        this.selectedFilter = filter
      }
      if (searcher && this.search) {
        this.$refs.search.setSearch(searcher)
      } else if (!searcher && this.search) {
        this.$refs.search.clearSearch()
      }
      if (page) {
        this.$nextTick(() => {
          this.currentPage = page
        })
      }
      this.useRemoteChange()
      // TODO:测试功能 有远程 无远程 ，半有半无
    },
    clearSort () {
      Object.keys(this.sortIndexs).forEach(key => {
        this.sortIndexs[key] = 0
      })
      this.currentSortColumn = null
    },
    computeHorizontalScrollBarHeight () {
      const tbody = this.mainTBodyEl
      this.tbodyWrapperHeight = tbody.clientHeight
      this.tbodyWrapperOffsetHeight = tbody.offsetHeight
      // this.scrollBarHorizontalHeight =
      //   this.tbodyWrapperOffsetHeight - this.tbodyWrapperHeight
      this.scrollBarHorizontalHeight = 8
    },
    computeScollBar () {
      this.$nextTick(() => {
        let tr = this.relTable.querySelector('tr')
        this.trHeight = tr ? tr.offsetHeight : 0
        const tbody = this.mainTBodyEl

        // this.scrollBarWidth = tbody.offsetWidth - tbody.clientWidth
        this.scrollBarWidth = 8

        this.computeHorizontalScrollBarHeight()
      })
    },
    computePageDivideData (data) {
      if (this.pagination && this.pagination.limit && !this.pagination.custom) {
        let start = (this.currentPage - 1) * this.pagination.limit
        let end = start + this.pagination.limit
        data = data.slice(start, end)
        // 删除了这个元素为本页最后一个那么应该跳转到上一页
        if (data.length === 0 && this.currentPage > 1) {
          start = (this.currentPage - 2) * this.pagination.limit
          end = start + this.pagination.limit
          this.currentPage = this.currentPage - 1
          data = this.searchData.slice(start, end)
        }
      }
      return data
    },
    init () {
      this.$nextTick(() => {
        this.mainTBodyEl = this.$refs.mainTable.$refs.tbody.$el
        this.relTable = this.mainTBodyEl.querySelector('table')
        // this.relTHead = this.$refs.header.$el.querySelector('table')
        this.wrapper = this.$refs.tableWrapper
        this.wrapperWidth = this.$refs.tableWrapper.offsetWidth
        this.tbodyWidth = this.relTable.offsetWidth

        this.headerRealEl = this.$refs.mainTable.$refs.header.$el.querySelector(
          'thead'
        )
        this.headerHeight = this.headerRealEl.offsetHeight
        this.fixedLeftTBodyEl =
          this.$refs.fixedLeftTable && this.$refs.fixedLeftTable.$refs.tbody.$el
        this.fixedRightTBodyEl =
          this.$refs.fixedLeftTable &&
          this.$refs.fixedRightTable.$refs.tbody.$el
        this.wrapperWidth = this.$refs.tableWrapper.offsetWidth
        this.tbodyWrapperWidth = this.$refs.tbodyWrapper.clientWidth
        this.tbodyWrapperHeight = this.$refs.tbodyWrapper.clientHeight
        this.tbodyWrapperOffsetHeight = this.$refs.tbodyWrapper.offsetHeight

        this.computeScollBar()

        // console.log(this.relTable.offsetWidth)

        // this.scrollBarWidth = 5
      })
    },
    onAllCheckboxesClick () {
      this.currentPageAllSelect = !this.currentPageAllSelect
      this.showingData.forEach(item => {
        this.checkBoxes[item._index] = this.currentPageAllSelect
      })
      this.checkBoxes = [].concat(this.checkBoxes)
    },
    handleSearch ({ key, word }) {
      this.currentSearchColumn = {
        key,
        word
      }
      if (word.length === 0) {
        this.currentSearchColumn = null
      } else {
        // because after search ,length maybe change , so need to reset current page
        this.currentPage = 1
      }
      if (this.search.onSearch === 'custom') {
        this.useRemoteChange()
      }
    },
    getCusomFilterData () {
      if (!this.currentFilterColumn) {
        return null
      }
      let currentFilterColumn = null
      let keys = Object.keys(this.currentFilterColumn)
      currentFilterColumn = {}

      keys.forEach(key => {
        let val = this.currentFilterColumn[key].value
        let filterFn = this.currentFilterColumn[key].filterFn
        if (filterFn === 'custom') {
          currentFilterColumn[key] = {
            value: val
          }
        }
      })
      if (Object.keys(currentFilterColumn).length === 0) {
        currentFilterColumn = null
      }
      return currentFilterColumn
    },
    getCusomSorterData () {
      if (!this.currentSortColumn) {
        return null
      }
      const isCustom =
        this.currentSortColumn.sortable === 'custom' &&
        this.currentSortColumn.type !== null
      return isCustom ? this.currentSortColumn : null
    },
    useRemoteChange () {
      clearTimeout(this.remoteTimter)

      this.remoteTimter = setTimeout(() => {
        const currentFilterColumn = this.getCusomFilterData()
        const currentSortColumn = this.getCusomSorterData()
        const emitData = {
          filter: currentFilterColumn,
          sorter: currentSortColumn,
          pagination: this.paginationer,
          search: this.currentSearchColumn
        }
        this.$emit('on-change', emitData)
        this.onChange && this.onChange(emitData)
      }, 300)
    },
    computeShowingData () {
      let data = this.copyData
      // compute filter
      if (this.currentFilterColumn) {
        // const { filterFn, value } = this.operatingfilter
        if (Object.keys(this.currentFilterColumn).length === 0) {
          this.searchData = []
        }
        Object.keys(this.currentFilterColumn).forEach(key => {
          const { value, filterFn } = this.currentFilterColumn[key]
          if (value && filterFn !== 'custom') {
            data = data.filter(item => {
              return filterFn(value, item.row)
            })
          }
        })
      }
      // compute search
      if (this.currentSearchColumn && this.search.onSearch !== 'custom') {
        const { key, word } = this.currentSearchColumn
        data = data.filter(item => {
          return this.search.onSearch(key, word, item.row)
        })
      }

      // compute sort
      if (this.currentSortColumn) {
        data = this.computeSortData(data)
      }
      if (data.length === 0) {
        data = null
      }
      return data
    },
    computeSortData (data) {
      data = data.slice(0)
      let { sortable, key, type, column } = this.currentSortColumn
      // use remote sort
      if (sortable === true) {
        if (!this.searchDataNoSort && this.data.length !== 0) {
          this.searchDataNoSort = data.slice(0)
        }
        if (type === 0 || type === null) {
          if (this.searchDataNoSort) {
            data = this.searchDataNoSort
            this.searchDataNoSort = null
          }
        } else {
          data = data.sort((a, b) => {
            a = a.row
            b = b.row
            if (type > 0) {
              if (column.sorter) {
                return column.sorter(a, b)
              }
              return ('' + a[key]).localeCompare('' + b[key])
            } else {
              if (column.sorter) {
                return column.sorter(b, a)
              }
              return ('' + b[key]).localeCompare('' + a[key])
            }
          })
        }
      }
      if (type !== 0) {
        Object.keys(this.sortIndexs).forEach(key => {
          if (key !== column.key) {
            this.sortIndexs[key] = 0
          }
        })
      }
      return data
    },
    onFilter (value, column) {
      if (column.onFilter === 'custom') {
        this.useRemoteChange()
      }
      this.$emit('on-filter-change', this.currentFilterColumn)
    },
    onSortChange (sortIndexs) {
      this.sortIndexs = sortIndexs
    }
  }
}
</script>
