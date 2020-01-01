<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-24 16:16:09
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-06 10:30:17
 -->
<template>
  <div
    ref="wrapper"
    class="n-data-table"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-data-table--bordered': bordered,
      'n-data-table--no-data': showingData.length === 0
    }"
  >
    <div
      ref="tableWrapper"
      class="n-data-table-tables-wrapper"
    >
      <!-- table head -->
      <base-table
        ref="mainTable"
        :scroll-x="scrollX"
        :body-style="bodyStyle"
        :showing-data="showingData"
        :columns="columns"
        :row-class-name="rowClassName"
        :check-boxes="checkBoxes"
        :disabled-check-box="disabledCheckBox"
        :loading="loading"
        :sort-indexes="sortIndexes"
        :selected-filter="selectedFilter"
        :current-page-selected-len="currentPageSelectedLength"
        :body-min-height="42"
        @header-scroll="handleMainTableHeaderScroll"
        @scroll="handleMainTableBodyScroll"
        @check-all="handleCheckAll"
        @sort-change="onSortChange"
        @filter="onFilter"
      >
        <slot name="append" />
      </base-table>
      <div
        v-if="fixedRightColumn.length"
        class="n-data-table-table-wrapper n-data-table-table-wrapper--right-fixed"
        :class="{
          'n-data-table-table-wrapper--active': mainTableScrollContainerWidth && mainTableScrollContainerWidth + horizontalScrollLeft !== scrollX
        }"
      >
        <base-table
          ref="rightFixedTable"
          placement="right"
          :header-height="headerHeight"
          :columns="fixedRightColumn"
          :sort-indexes="sortIndexes"
          :selected-filter="selectedFilter"
          :showing-data="showingData"
          :current-page-selected-len="currentPageSelectedLength"
          :body-style="bodyStyle"
          :row-class-name="rowClassName"
          :check-boxes="checkBoxes"
          :disabled-check-box="disabledCheckBox"
          :tr-height="trHeight"
          :loading="loading"
          :fixed="true"
          @scroll="handleFixedTableBodyScroll"
          @check-all="handleCheckAll"
          @sort-change="onSortChange"
          @filter="onFilter"
        />
      </div>
      <div
        v-if="fixedLeftColumn.length"
        class="n-data-table-table-wrapper n-data-table-table-wrapper--left-fixed"
        :class="{
          'n-data-table-table-wrapper--active': horizontalScrollLeft > 0
        }"
      >
        <base-table
          ref="leftFixedTable"
          :header-height="headerHeight"
          :columns="fixedLeftColumn"
          :sort-indexes="sortIndexes"
          :selected-filter="selectedFilter"
          :showing-data="showingData"
          :current-page-selected-len="currentPageSelectedLength"
          :body-style="bodyStyle"
          :row-class-name="rowClassName"
          :check-boxes="checkBoxes"
          :disabled-check-box="disabledCheckBox"
          header-ref-name="header"
          :tr-height="trHeight"
          :loading="loading"
          :fixed="true"
          @scroll="handleFixedTableBodyScroll"
          @check-all="handleCheckAll"
          @sort-change="onSortChange"
          @filter="onFilter"
        />
      </div>
      <!-- loading -->
      <transition name="n-table-loading--transition">
        <div v-if="loading" class="n-data-table__loading">
          <n-spin
            :spinning="true"
            style="width:100%;overflow:hidden;z-index:200;position:absolute;top:50%;"
          />
        </div>
      </transition>
      <div
        v-if="showingData.length === 0 && !loading"
        class="n-data-table__no-data-tip"
      >
        No data
      </div>
    </div>
    <!-- 分页 -->
    <div
      v-if="pagination !== false"
      class="n-data-table__pagination"
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
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import { storageMixin } from '../store'
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
  name: 'NDataTable',
  components: {
    BaseTable
  },
  mixins: [storageMixin, withapp, themeable],
  props: {
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
      default: () => {}
    },
    minHeight: {
      type: [Number, String],
      default: 'unset'
    },
    maxHeight: {
      type: [Number, String],
      default: null
    },
    maxWidth: {
      type: [Number, String],
      default: null
    },
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
    bordered: {
      type: Boolean,
      default: true
    },
    scrollX: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      triggerOnChange: true,
      headerHeight: null,
      clonedData: [],
      sortIndexes: {},
      tbodyWidth: null,
      processedData: [],
      currentFilterColumn: null,
      currentPage: 1,
      selectedFilter: {},
      checkBoxes: [],
      disabledCheckBox: [],
      trHeight: null,
      mainTableScrollContainerWidth: null,
      horizontalScrollLeft: 0
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
      Object.keys(this.sortIndexes).forEach(key => {
        if (this.sortIndexes[key] !== null) {
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
        type: this.sortIndexes[sorterKey],
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
        const total = this.pagination.total
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
        data = this.clonedData
      }
      if (this.pagination.custom !== true) {
        data = this.computePageDivideData(data)
      }
      return data
    },
    styleMaxHeight () {
      if (typeof this.maxHeight === 'number') return this.maxHeight + 'px'
      return this.maxHeight
    },
    styleMinHeight () {
      if (typeof this.minHeight === 'number') return this.minHeight + 'px'
      return this.minHeight
    },
    bodyStyle () {
      return {
        maxHeight: this.styleMaxHeight,
        minHeight: this.styleMinHeight
      }
    },
    selectedRows () {
      return this.checkBoxes
        .map((isChecked, idx) => {
          if (isChecked && this.disabledCheckBox[idx] !== false) {
            return this.clonedData[idx]
          }
        })
        .filter(item => item !== void 0)
    },
    currentPageSelectedLength () {
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
        this.currentPageSelectedLength !== this.showingData.length &&
        this.showingData.length !== 0 &&
        this.currentPageSelectedLength !== 0
      ) {
        return true
      }
      return false
    },
    allCheckboxesSelect () {
      if (
        this.currentPageSelectedLength === this.showingData.length &&
        this.showingData.length !== 0
      ) {
        return true
      }
      return false
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
      this.scrollMainTableBodyToTop()
      // }

      // this.currentPageAllSelect = this.allCheckboxesSelect
      this.$emit('on-page-change', this.paginationer)
    },
    data () {
      this.initData()
      this.processedData = this.createShowingData()
      this.processedDataNoSort = null
      this.checkBoxes = []
      this.disabledCheckBox = []
      this.currentPageAllSelect = false
      this.$tableStore.commit('selectedAllChecked', false)
    },
    currentSortColumn (sorter, oldSorter) {
      this.processedData = this.createShowingData()
      //  上次的若是为custom,本次为locale sort那么也需要触发useRemoteChange
      // if (
      //   sorter.sorter === 'custom' ||
      //   (oldSorter && oldSorter.sorter === 'custom')
      // ) {
      //   this.useRemoteChange()
      // }
      this.useRemoteChange()
      this.$emit('sort-change', this.currentSortColumn)
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
        this.$emit('filter-change', this.getFilterData())
      }
    },
    currentFilterColumn: {
      handler () {
        this.processedData = this.createShowingData()
        // because after filter length maybe change , so need to reset current page
        if (this.triggerOnChange) this.currentPage = 1
      },
      deep: true
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.collectDOMSizes()
    window.addEventListener('resize', this.collectDOMSizes)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.collectDOMSizes)
  },
  methods: {
    setDefaultOrderAndFilter () {
      this.columns.forEach((column, i) => {
        if (column.defaultFilter) {
          this.$set(this.selectedFilter, column.key || i, column.defaultFilter)
        }
        if (column.defaultSortOrder) {
          this.$set(
            this.sortIndexes,
            column.key || i,
            sortOrderMap[column.defaultSortOrder]
          )
        }
      })
    },
    scrollMainTableBodyToTop () {
      const {
        body
      } = this.getScrollElements
      body.scrollTop = 0
    },
    getScrollElements () {
      const header = this.$refs.mainTable.getHeaderElement()
      const body = this.$refs.mainTable ? this.$refs.mainTable.getBodyElement() : null
      const fixedLeftBody = this.$refs.leftFixedTable ? this.$refs.leftFixedTable.getBodyElement() : null
      const fixedRightBody = this.$refs.rightFixedTable ? this.$refs.rightFixedTable.getBodyElement() : null
      return {
        header,
        body,
        fixedLeftBody,
        fixedRightBody
      }
    },
    handleMainTableHeaderScroll (e) {
      const {
        scrollLeft
      } = e.target
      const {
        body: bodyEl
      } = this.getScrollElements()
      bodyEl.scrollLeft = scrollLeft
      this.horizontalScrollLeft = scrollLeft
    },
    handleMainTableBodyScroll (e) {
      this.handleTableBodyScroll(e, true)
    },
    handleFixedTableBodyScroll (e) {
      this.handleTableBodyScroll(e, false)
    },
    handleTableBodyScroll (e, isMainTable = false) {
      const {
        scrollTop,
        scrollLeft
      } = e.target
      const {
        header: headerEl,
        body: bodyEl,
        fixedLeftBody: leftBodyEl,
        fixedRightBody: rightBodyEl
      } = this.getScrollElements()
      if (isMainTable) {
        if (headerEl) {
          headerEl.scrollLeft = scrollLeft
          this.horizontalScrollLeft = scrollLeft
        }
      }
      if (bodyEl && bodyEl.scrollTop !== scrollTop) {
        bodyEl.scrollTop = scrollTop
      }
      if (leftBodyEl && leftBodyEl.scrollTop !== scrollTop) {
        leftBodyEl.scrollTop = scrollTop
      }
      if (rightBodyEl && rightBodyEl.scrollTop !== scrollTop) {
        rightBodyEl.scrollTop = scrollTop
      }
      this.mainTableScrollContainerWidth = bodyEl.offsetWidth
    },
    initData () {
      this.clonedData = this.data.slice(0).map((row, idx) => {
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
    page (pageNum, triggerOnChange = false) {
      this.triggerOnChange = triggerOnChange

      this.currentPage = pageNum
      this.$nextTick(() => {
        this.triggerOnChange = !triggerOnChange
      })
    },
    sort (columnKey, order, triggerOnChange = false) {
      this.triggerOnChange = triggerOnChange

      if (columnKey == null) {
        this.clearSort()
        return
      }
      this.$set(this.sortIndexes, columnKey, sortOrderMap[order])
      this.$nextTick(() => {
        this.triggerOnChange = !triggerOnChange
      })
    },
    filter (filterOptions, triggerOnChange = false) {
      this.triggerOnChange = triggerOnChange

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
        this.triggerOnChange = !triggerOnChange
      })
    },
    /**
     * @deprecated
     * 废弃的,
     */
    _setParams ({ filter, sorter, page }) {
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
      Object.keys(this.sortIndexes).forEach(key => {
        this.sortIndexes[key] = 0
      })
    },
    computeCurrentPageSelection () {
      const needChecked =
        (this.currentPageSelectedLength > 0 &&
          this.currentPageSelectedLength === this.showingData.length) ||
        this.isCheckedBoxAllIndeterminate
      this.$tableStore.commit('selectedAllChecked', needChecked)
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
    collectDOMSizes () {
      this.headerEl = this.$refs.mainTable.$refs.header.$el.querySelector(
        'thead'
      )
      this.headerHeight = this.headerEl.offsetHeight

      const { body: mainTableScrollContainer } = this.getScrollElements()
      this.mainTableScrollContainerWidth = mainTableScrollContainer.offsetWidth
    },
    handleCheckAll () {
      this.showingData.forEach(item => {
        this.checkBoxes[item._index] = this.$tableStore.state.selectedAllChecked
      })
      this.checkBoxes = [].concat(this.checkBoxes)
    },
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
    useRemoteChange () {
      if (!this.triggerOnChange) return
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
        }
        this.$emit('change', emitData)
        this.onChange && this.onChange(emitData)
      }, 300)
    },
    createShowingData () {
      let data = this.clonedData
      // compute filter
      if (this.currentFilterColumn) {
        // const { filterFn, value } = this.operatingfilter
        if (Object.keys(this.currentFilterColumn).length === 0) {
          this.processedData = []
        }
        Object.keys(this.currentFilterColumn).forEach(key => {
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
        data = this.createSortedData(data)
      }

      if (data.length === 0) {
        data = null
      }
      return data
    },
    createSortedData (data) {
      data = data.slice(0)
      let { sortable, key, type, column } = this.currentSortColumn
      // use remote sort
      if (sortable === true) {
        // console.log(
        //   'TCL: createSortedData -> this.processedDataNoSort ',
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
          data.sort((a, b) => {
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
        Object.keys(this.sortIndexes).forEach(sorterKey => {
          if (sorterKey !== column.key) {
            this.sortIndexes[sorterKey] = 0
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
    onSortChange (sortIndexes) {
      this.sortIndexes = sortIndexes
    }
  }
}
</script>
