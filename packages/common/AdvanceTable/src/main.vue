<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-23 15:57:17
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-10-23 18:51:15
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
    <div ref="tbodyWrapper" class="n-advance-table__tbody">
      <div class="n-advance-table__fixed--left">
        <table-header
          ref="fixedLeftHeader"
          :columns="fixedLeftColumn"
          :col-group-stl="colGroup"
          :scroll-bar-width="scrollBarWidth"
          :sort-indexs="sortIndexs"
          :selected-filter="selectedFilter"
          :showing-data="showingData"
          @on-checkbox-all="onAllCheckboxesClick"
          @on-sort-change="onSortChange"
          @on-filter="onFilter"
        />
        <table-body
          ref="fixedLeftTbody"
          :table-stl="tableStl"
          :showing-data="showingData"
          :columns="fixedLeftColumn"
          :row-class-name="rowClassName"
          :check-boxes="checkBoxes"
          :disabled-check-box="disabledCheckBox"
          :loading="loading"
          header-ref-name="header"
        />
      </div>
      <!-- table head -->
      <table-header
        ref="header"
        :columns="columns"
        :col-group-stl="colGroup"
        :scroll-bar-width="scrollBarWidth"
        :sort-indexs="sortIndexs"
        :selected-filter="selectedFilter"
        :showing-data="showingData"
        @on-checkbox-all="onAllCheckboxesClick"
        @on-sort-change="onSortChange"
        @on-filter="onFilter"
      />
      <!-- table body -->
      <TableBody
        ref="tbody"
        :table-stl="tableStl"
        :showing-data="showingData"
        :columns="columns"
        :row-class-name="rowClassName"
        :check-boxes="checkBoxes"
        :disabled-check-box="disabledCheckBox"
        :loading="loading"
        header-ref-name="header"
        @on-scroll="onBodyScrolll"
      />
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
import TableHeader from '../header/header'
import TableBody from '../body/body'

export default {
  name: 'NAdvanceTable',
  components: {
    TableBody,
    searchInput,
    TableHeader
  },
  mixins: [withapp, themeable],
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
      currentPageAllSelect: false
    }
  },
  computed: {
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
          console.log('TCL: pageCount -> total', total)
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
        overflow: 'auto',
        ...this.colGroup
      }
      if (this.maxHeight) {
        stl.maxHeight =
          typeof this.maxHeight === 'number'
            ? this.maxHeight + 'px'
            : this.maxHeight
      }
      if (this.maxWidth) {
        stl.maxWidth =
          typeof this.maxWidth === 'number'
            ? this.maxWidth + 'px'
            : this.maxWidth
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
      let stl = { width: `100%` }
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
    currentPageSelected () {
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
      return (
        this.currentPageSelected === this.showingData.length ||
        this.currentPageSelected === 0
      )
    },
    allCheckboxesSelect: {
      get () {
        if (
          this.currentPageSelected === this.showingData.length &&
          this.showingData.length !== 0
        ) {
          return true
        }
        return false
      }
    }
  },
  watch: {
    currentPage () {
      if (this.pagination.custom === true) {
        this.useRemoteChange()
      }
      this.currentPageAllSelect = this.allCheckboxesSelect
      this.$emit('on-page-change', this.paginationer)
    },
    data () {
      this.initData()
      this.searchData = this.computeShowingData()
      this.searchDataNoSort = null
      this.checkBoxes = []
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
    this.relTable = this.$refs.tbody.$el.querySelector('table')
    // this.relTHead = this.$refs.header.$el.querySelector('table')
    this.wrapper = this.$refs.tableWrapper
    this.wrapperWidth = this.$refs.tableWrapper.offsetWidth
    this.tbodyWidth = this.relTable.offsetWidth

    this.headerRealEl = this.$refs.header.$el.querySelector('thead')
    this.fixedLeftTBodyEl = this.$refs.fixedLeftTbody.$el
    // console.log(this.wrapperWidth, this.tbodyWidth)

    this.init()

    // window.addEventListener('resize', this.init)
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.init)
  },
  methods: {
    onBodyScrolll (event) {
      this.headerRealEl.style.transform = `translate3d(-${event.target.scrollLeft}px,0,0)`
      if (this.fixedLeftTBodyEl) {
        this.fixedLeftTBodyEl.scrollTop = event.target.scrollTop
      }
      console.log(
        'TCL: onBodyScrolll -> event.target.scrollTop',
        event.target.scrollTop
      )
      event.stopPropagation()
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
    computeScollBar () {
      this.$nextTick(() => {
        this.tbodyWidth = this.relTable.offsetWidth
        this.scrollBarWidth = this.tbodyWrapperWidth - this.tbodyWidth
        // console.log('TCL: mounted -> this.scrollBarWidth', this.wrapperWidth, this.tbodyWidth)
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
        this.wrapperWidth = this.$refs.tableWrapper.offsetWidth
        this.tbodyWrapperWidth = this.$refs.tbodyWrapper.clientWidth
        this.computeScollBar()

        // console.log(this.relTable.offsetWidth)

        // this.scrollBarWidth = 5
      })
    },
    onAllCheckboxesClick (currentPageAllSelect) {
      this.showingData.forEach(item => {
        this.checkBoxes[item._index] = currentPageAllSelect
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
        console.log(
          'TCL: this.remoteTimter -> currentSortColumn',
          currentSortColumn,
          this.currentSortColumn
        )
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
      return data
    },
    onFilter (value, column) {
      if (column.onFilter === 'custom') {
        this.useRemoteChange()
      }
      this.$emit('on-filter-change', this.currentFilterColumn)
    },
    onSortChange (sortIndexs) {
      console.log('TCL: onSortTypeChange -> sortIndexs', sortIndexs)
      this.sortIndexs = sortIndexs
    }
  }
}
</script>
