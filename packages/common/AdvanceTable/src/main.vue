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
          :current-page-selected-len="currentPageSelectedLen"
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
        :scroll-x="scrollX"
        :table-stl="tableStl"
        :showing-data="showingData"
        :columns="columns"
        :row-class-name="rowClassName"
        :check-boxes="checkBoxes"
        :disabled-check-box="disabledCheckBox"
        :loading="loading"
        :col-group-stl="colGroup"
        :sort-indexs="sortIndexs"
        :selected-filter="selectedFilter"
        :current-page-selected-len="currentPageSelectedLen"
        :body-min-height="42"
        :scroll-bar-vertical-width="scrollBarWidth"
        @scroll.native="onTableWrapperScroll"
        @on-scroll="onBodyScrolll"
        @on-checkbox-all="onAllCheckboxesClick"
        @on-sort-change="onSortChange"
        @on-filter="onFilter"
      >
        <slot name="append" />
      </base-table>
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
          :current-page-selected-len="currentPageSelectedLen"
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
      v-if="pagination !== false"
      :style="tableWrapperStl"
      class="n-advance-table__pagination"
    >
      <n-pagination
        v-model="currentPage"
        :page-count="pageCount"
        :page-slot="paginationer.pageSlot || 5"
        :show-quick-jumper="
          paginationer.showQuickJumper ? paginationer.showQuickJumper : false
        "
        :disabled="loading"
      />
    </div>
  </div>
</template>

<script>
// import searchInput from '../searchInput'
import { noopFn } from '../../../utils/index'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import { Store, storageMixin } from '../store'
import BaseTable from '../baseTable/baseTable'

const sortOrderMap = {
  ascend: 1,
  descend: -1,
  unset: 0
}
const sortOrderReverseMap = {
  '-1': 'descend',
  '1': 'ascend',
  '0': 'unset'
}

export default {
  store () {
    return new Store()
  },
  name: 'NAdvancedTable',
  components: {
    // searchInput,
    BaseTable
  },
  mixins: [storageMixin, withapp, themeable],
  props: {
    // search: {
    //   /**
    //    * @description if onSearch === 'custom' will exec this.onChange
    //    * columns:{label,value}
    //    * placeholder @description search input placeholder
    //    * onSearch @type Function | String 'custom' @returns Boolean, @description used in locale @example ( key, word,row)=>{return row.xxx.includes[word]}
    //    */
    //   type: [Object, Boolean],
    //   default: false
    // },
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
    },
    scrollX: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      isOnlyViewChange: false,
      headerHeight: 0,
      copyData: [],
      sortIndexs: {},
      wrapperWidth: 'unset',
      tbodyWidth: 'auto;',
      scrollBarWidth: '0',
      processedData: [],
      currentFilterColumn: null,
      // currentSearchColumn: null,
      currentPage: 1,
      selectedFilter: {},
      checkBoxes: [],
      disabledCheckBox: [],
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
        'n-advance-table__fixed--active': this.horizontalScrollLeft < 0
      }
    },
    tableWrapperStl () {
      let stl = {}
      // if (this.maxWidth) {
      //   stl.maxWidth =
      //     typeof this.maxWidth === 'number'
      //       ? this.maxWidth + 'px'
      //       : this.maxWidth
      // }
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
        sorter: sorterColumn.sorter,
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
        // if (this.pagination.custom !== true) {
        //   total = this.data.length
        // }
        return Math.ceil(total / this.pagination.limit) || 1
      }
      return 1
    },
    showingData () {
      let data = this.processedData
      if (data === null) {
        data = []
      } else if (!this.processedData.length) {
        data = this.copyData
      }
      if (this.pagination.custom !== true) {
        data = this.computePageDivideData(data)
      }
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
    columns: {
      handler () {
        this.$nextTick(() => {
          this.setDefaultOrderAndFilter()
        })
      },
      immediate: true
    },
    // allCheckboxesSelect (val) {
    //   this.currentPageAllSelect = val
    // },
    currentPage () {
      this.computeCurrentPageSelection()
      // if (this.pagination.custom === true) {

      this.useRemoteChange()
      this.bodyScrollToTop()
      // }

      // this.currentPageAllSelect = this.allCheckboxesSelect
      this.$emit('on-page-change', this.paginationer)
    },
    data () {
      this.initData()
      this.processedData = this.computeShowingData()
      this.processedDataNoSort = null
      this.checkBoxes = []
      this.disabledCheckBox = []
      this.currentPageAllSelect = false
      this.$store.commit('selectedAllChecked', false)

      this.computeScollBar()
    },
    currentSearchColumn () {
      this.processedData = this.computeShowingData()
    },
    currentSortColumn (sorter, oldSorter) {
      this.processedData = this.computeShowingData()
      //  上次的若是为custom,本次为locale sort那么也需要触发useRemoteChange
      // if (
      //   sorter.sorter === 'custom' ||
      //   (oldSorter && oldSorter.sorter === 'custom')
      // ) {
      //   this.useRemoteChange()
      // }
      this.useRemoteChange()
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
            this.currentFilterColumn[key] = {
              value: [].concat(val[key]),
              filterFn: column.filter,
              filterMultiple: column.filterMultiple
            }
          }
        })

        this.$emit('on-filter-change', this.getFilterData())
      }
    },
    currentFilterColumn: {
      handler () {
        this.processedData = this.computeShowingData()
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
    this.init()

    window.addEventListener('resize', this.init)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.init)
  },
  methods: {
    setDefaultOrderAndFilter () {
      this.columns.forEach((column, i) => {
        if (column.defaultFilter) {
          this.$set(this.selectedFilter, column.key || i, column.defaultFilter)
        }
        if (column.defaultSortOrder) {
          this.$set(
            this.sortIndexs,
            column.key || i,
            sortOrderMap[column.defaultSortOrder]
          )
        }
      })
    },
    onTableWrapperScroll (event) {
      const el = event.target
      const left = el.scrollLeft
      this.horizontalScrollLeft = left - 1
    },
    bodyScrollToTop () {
      const scrollEls = [
        this.fixedLeftTBodyEl,
        this.mainTBodyEl,
        this.fixedRightTBodyEl
      ]
      scrollEls.forEach(el => {
        if (el) {
          el.classList.add('n-table--scroll-smooth')
          window.requestAnimationFrame(() => {
            el.scrollTop = 0
            el.classList.remove('n-table--scroll-smooth')
          })
        }
      })
    },
    onBodyScrolll (event) {
      const currentEl = this.$store.state.currentTableEl
      const scrollEls = [
        this.fixedLeftTBodyEl,
        this.mainTBodyEl,
        this.fixedRightTBodyEl
      ]

      window.requestAnimationFrame(() => {
        scrollEls
          .filter(
            item => item !== currentEl && item !== null && item !== undefined
          )
          .forEach(el => {
            if (currentEl) el.scrollTop = currentEl.scrollTop
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
    toggleRowSelection (rowIndexs = [], selected = true) {
      this.$nextTick(() => {
        if (rowIndexs === 'all') {
          this.showingData.forEach(item => {
            this.checkBoxes[item._index] = selected
          })
          this.checkBoxes = [].concat(this.checkBoxes)
        } else {
          if (this.showingData.length > 0) {
            rowIndexs.forEach(idx => {
              if (this.showingData[idx]) {
                const realIdx = this.showingData[idx]._index
                this.checkBoxes[realIdx] = selected
              }
            })
            this.checkBoxes = [].concat(this.checkBoxes)
          }
        }
      })
    },
    page (pageNum, isOnlyViewChange = true) {
      this.isOnlyViewChange = isOnlyViewChange

      this.currentPage = pageNum
      this.$nextTick(() => {
        this.isOnlyViewChange = !isOnlyViewChange
      })
    },
    sort (columnKey, order, isOnlyViewChange = true) {
      this.isOnlyViewChange = isOnlyViewChange

      if (columnKey == null) {
        this.clearSort()
        return
      }
      this.$set(this.sortIndexs, columnKey, sortOrderMap[order])
      this.$nextTick(() => {
        this.isOnlyViewChange = !isOnlyViewChange
      })
    },
    filter (filterOptions, isOnlyViewChange = true) {
      this.isOnlyViewChange = isOnlyViewChange

      if (filterOptions === null) {
        this.selectedFilter = {}
        return
      }
      Object.keys(filterOptions).forEach(key => {
        const col = this.columns.find(column => column.key === key)
        if (!col.filterMultiple) {
          filterOptions[key] = filterOptions[key][0]
        }
      })
      this.selectedFilter = filterOptions

      this.$nextTick(() => {
        this.isOnlyViewChange = !isOnlyViewChange
      })
    },
    setParams ({ filter, sorter, page }) {
      if (sorter) {
        this.sort(sorter.key, sorter.order)
      } else {
        this.clearSort()
      }

      this.currentFilterColumn ? (this.selectedFilter = {}) : void 0

      if (filter) {
        this.filter(filter)
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
    },
    computeScollBar () {
      this.$nextTick(() => {
        let tr = this.relTable.querySelector('tr')
        this.trHeight = tr ? tr.offsetHeight : 0
        const tbody = this.mainTBodyEl
        this.tbodyWrapperHeight = tbody.clientHeight
        this.tbodyWrapperOffsetHeight = tbody.offsetHeight
        this.scrollBarWidth = tbody.offsetWidth - tbody.clientWidth
      })
    },
    computeCurrentPageSelection () {
      const needChecked =
        (this.currentPageSelectedLen > 0 &&
          this.currentPageSelectedLen === this.showingData.length) ||
        this.isCheckedBoxAllIndeterminate
      this.$store.commit('selectedAllChecked', needChecked)
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
          data = this.processedData.slice(start, end)
        }
      }
      return data
    },
    init () {
      this.$nextTick(() => {
        this.mainTBodyEl = this.$refs.mainTable.$refs.tbody.$el
        this.mainTBodyWrapperEl = this.$refs.mainTable.$el

        this.relTable = this.mainTBodyEl.querySelector('table')
        // this.relTHead = this.$refs.header.$el.querySelector('table')
        this.wrapperWidth = this.$refs.tableWrapper.offsetWidth

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

        this.horizontalScrollLeft =
          this.mainTBodyWrapperEl.clientWidth > parseInt(this.scrollX) ? 0 : -1

        this.computeScollBar()
      })
    },
    onAllCheckboxesClick () {
      this.showingData.forEach(item => {
        this.checkBoxes[item._index] = this.$store.state.selectedAllChecked
      })
      this.checkBoxes = [].concat(this.checkBoxes)
    },
    // handleSearch ({ key, word }) {
    //   this.currentSearchColumn = {
    //     key,
    //     word
    //   }
    //   if (word.length === 0) {
    //     this.currentSearchColumn = null
    //   } else {
    //     // because after search ,length maybe change , so need to reset current page
    //     this.currentPage = 1
    //   }
    //   if (this.search.onSearch === 'custom') {
    //     this.useRemoteChange()
    //   }
    // },
    getFilterData (option = 'all') {
      if (!this.currentFilterColumn) {
        return null
      }
      let currentFilterColumn = null
      let keys = Object.keys(this.currentFilterColumn)
      currentFilterColumn = {}

      keys.forEach(key => {
        let val = this.currentFilterColumn[key].value
        // let filterFn = this.currentFilterColumn[key].filterFn
        // let filterMultiple = this.currentFilterColumn[key].filterMultiple
        currentFilterColumn[key] = val
      })
      if (Object.keys(currentFilterColumn).length === 0) {
        currentFilterColumn = null
      }
      return currentFilterColumn
    },
    // getCustomSorterData () {
    //   if (!this.currentSortColumn) {
    //     return null
    //   }
    //   const isCustom =
    //     this.currentSortColumn.sorter === 'custom' &&
    //     this.currentSortColumn.type !== null
    //   return isCustom ? this.currentSortColumn : null
    // },
    useRemoteChange () {
      if (this.isOnlyViewChange) return
      clearTimeout(this.remoteTimter)

      this.remoteTimter = setTimeout(() => {
        const currentFilterColumn = this.getFilterData('custom')
        const currentSortColumn = this.currentSortColumn

        const sortType =
          currentSortColumn && Number(currentSortColumn.type).toString()
        const emitData = {
          filter: currentFilterColumn || null,
          sorter:
            currentSortColumn && currentSortColumn.type !== 0
              ? {
                field: currentSortColumn.key,
                order: sortOrderReverseMap[sortType],
                column: currentSortColumn.column
              }
              : null,
          pagination: this.paginationer || null
          // search: this.currentSearchColumn
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
          this.processedData = []
        }
        Object.keys(this.currentFilterColumn).forEach(key => {
          console.log(
            'TCL: computeShowingData -> this.currentFilterColumn',
            this.currentFilterColumn
          )
          const { value, filterFn } = this.currentFilterColumn[key]
          if (value && filterFn !== 'custom' && filterFn) {
            data = data.filter(item => {
              for (let i = 0; i < value.length; i++) {
                if (filterFn(value[i], item.row)) {
                  return true
                }
              }
              return false
            })
          }
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
        // console.log(
        //   'TCL: computeSortData -> this.processedDataNoSort ',
        //   this.processedDataNoSort
        // )

        // if (!this.processedDataNoSort && this.data.length !== 0) {
        //   this.processedDataNoSort = data.slice(0)
        // }
        if (type === 0 || type === null) {
          // if (this.processedDataNoSort) {
          //   data = this.processedDataNoSort
          //   this.processedDataNoSort = null
          // }
          return data
        } else {
          data = data.sort((a, b) => {
            a = a.row
            b = b.row
            if (type > 0) {
              if (column.sorter && typeof column.sorter === 'function') {
                return column.sorter(a, b)
              }
              return ('' + a[key]).localeCompare('' + b[key])
            } else {
              if (column.sorter && typeof column.sorter === 'function') {
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
      // if (column.filter === 'custom') {
      this.useRemoteChange()
      // }
    },
    onSortChange (sortIndexs) {
      this.sortIndexs = sortIndexs
    }
  }
}
</script>
