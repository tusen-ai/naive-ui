<template>
  <div
    ref="tableWrapper"
    class="n-advance-tabel__wrapper"
  >
    <div class="n-advance-table__operation">
      <div class="n-advance-table__operation__left">
        <slot name="table-operation-batch-left" />
        <section class="n-advance-table__operation__bacth" />
        <slot name="table-operation-batch-right" />
      </div>
      <div
        class="n-advance-table__operation__right"
        :style="search ? 'margin-bottom: 18px;' : ''"
      >
        <slot name="table-operation" />
        <div
          v-if="search"
          class="n-advance-table__operation__search"
        >
          <searchInput
            ref="search"
            :options="search"
            @on-change="handleSearch"
          />
        </div>
        <slot name="table-operation-search-right" />
      </div>
    </div>
    <n-table
      ref="header"
      style="padding:0;border-bottom-left-radius:0;border-bottom-right-radius:0;"
      :style="colGroup"
    >
      <colgroup>
        <col
          v-for="(column, i) in columns"
          :key="i"
          :style="computeCustomWidthStl(column)"
        >
        <col
          v-if="scrollBarWidth"
          :width="scrollBarWidth"
        >
      </colgroup>
      <n-thead>
        <n-tr>
          <n-th
            v-for="(column, i) in columns"
            ref="theads"
            :key="column.key"
            :style="computeAlign(column)"
          >
            <n-checkbox
              v-if="column.type === 'selection'"
              v-model="allCheckboxesSelect"
              :indeterminate="!isCheckedBoxAllIndeterminate"
              @click.native="onAllCheckboxesClick"
            />
            {{ column.title }}
            <SortIcon
              v-if="column.sortable"
              :ref="'sorter_' + (column.key || i)"
              v-model="sortIndexs[column.key || i]"
              :column="column"
              :index="i"
              @onSortTypeChange="onSortTypeChange"
            />

            <!-- 优先自定义 -->
            {{ column.filterDropdown && column.filterDropdown() }}
            <!-- 否则默认渲染 -->
            <PopFilter
              v-if="column.onFilter && (column.filterItems || column.asynsFilterItems)"
              v-model="selectedFilter[column.key]"
              :column="column"
              :items="column.filterItems || column.asynsFilterItems"
              @on-filter="onFilter"
            />

            <!-- <filterDropDown
              v-if="column.filterItems && !column.filterDropdown"
              :ref="'filterDropDown_' + (column.key || i)"
              :max-height="column.filterDropDownMaxHeight"
              :filter-fn="column.onFilter"
              :filter-key="column.key || i"
              :filter-items="column.filterItems"
              :filter-multiple="column.filterMultiple || false"
              @on-filter="
                ({ value, key, filterFn }) => onFilter(value, key, filterFn)
              "
            /> -->
          </n-th>
          <span
            v-if="scrollBarWidth"
            :style="
              'padding-left:' + scrollBarWidth + 'px;' + 'visibility:hidden;'
            "
            rowspan="1"
          />
        </n-tr>
      </n-thead>
    </n-table>
    <n-table
      ref="tbody"
      :style="tableStl"
      style="border-top-left-radius:0;border-top-right-radius:0;"
      @scroll.native="onBodyScrolll"
    >
      <colgroup v-if="showingData.length !== 0">
        <col
          v-for="(column, i) in columns"
          :key="i"
          :style="computeCustomWidthStl(column)"
        >
      </colgroup>
      <n-tbody v-show="!loading">
        <n-tr
          v-for="(rowData, i) in showingData"
          :key="i"
          :class="typeof rowClassName === 'function' ? rowClassName(rowData,i) : rowClassName"
        >
          <n-td
            v-for="column in columns"
            :key="column.key"
            :style="computeAlign(column)"
            :class="computeTdClass(column, rowData)"
          >
            <n-checkbox
              v-if="column.type === 'selection'"
              v-model="checkBoxes[rowData._index]"
            />
            <row
              v-else
              :index="i"
              :row="rowData"
              :key-name="column.key"
              :render="column.render"
            />
          </n-td>
        </n-tr>
        <div
          v-if="showingData.length === 0"
          class="n-no-data-tip"
        >
          No data
        </div>
        <!-- <tr style="display:inline-block;width:100%;"> -->

        <!-- </tr> -->
      </n-tbody>
      <template v-if="loading">
        <div style="width:100%;display:table-caption;">
          <Loading
            style="margin-top:20px;"
            :circle="{ time: '1.5s' }"
            :svg="{ height: '100px', width: '80px' }"
          />
        </div>
      </template>
    </n-table>

    <!-- 分页 -->
    <div
      v-if="pagination !== false && showingData.length"
      class="n-advanced-table__pagination"
    >
      <n-pagination
        v-model="currentPage"
        :page-count="pageCount"
      />
    </div>
  </div>
</template>

<script>
import row from '../row/index.js'
import SortIcon from '../sortIcon'
import PopFilter from '../popFilter'
import searchInput from '../searchInput'
import Loading from '../loading'
import { noopFn } from '../../../utils/index'

export default {
  name: 'NAdvanceTable',
  components: {
    row,
    SortIcon,
    PopFilter,
    searchInput,
    Loading
  },
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
      currentSortColumn: null,
      currentFilterColumn: null,
      currentSearchColumn: null,
      currentPage: 1,
      selectedFilter: {},
      checkBoxes: [],
      allCheckboxesSelect: false
    }
  },
  computed: {
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
        if (this.pagination.custom !== 'custom' && this.currentFilterColumn) {
          total = this.searchData.length
        }
        return Math.ceil(total / this.pagination.limit)
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
      if (this.pagination && this.pagination.limit && !this.pagination.custom) {
        let start = (this.currentPage - 1) * this.pagination.limit
        let end = start + this.pagination.limit
        data = data.slice(start, end)
      }
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
          if (isChecked) {
            return this.copyData[idx]
          }
        })
        .filter((item) => item !== void 0)
    },
    isCheckedBoxAllIndeterminate () {
      let selectedLen = 0
      this.showingData.forEach((item) => {
        let realIdx = item._index
        if (this.checkBoxes[realIdx] === true) {
          selectedLen++
        }
      })
      return selectedLen === this.showingData.length || selectedLen === 0
    }
  },
  watch: {
    currentPage () {
      if (this.pagination.custom === true) {
        this.useRemoteChange()
      }
      console.log('currentPage')

      this.$emit('on-page-change', this.paginationer)
    },
    data () {
      this.initData()
      this.searchData = this.computeShowingData()
      this.searchDataNoSort = null
      this.checkBoxes = []
      this.allCheckboxesSelect = false
    },
    currentSearchColumn () {
      this.searchData = this.computeShowingData()
    },
    currentSortColumn () {
      this.searchData = this.computeShowingData()
      console.log('currentSortColumn')
    },
    checkBoxes () {
      if (
        this.selectedRows.length === this.showingData.length &&
        this.showingData.length !== 0
      ) {
        this.allCheckboxesSelect = true
      }
      this.$emit('on-selected-change', this.selectedRows)
    },
    selectedFilter: {
      deep: true,
      handler (val) {
        this.currentFilterColumn = null
        console.log('TCL: selectedFilter -> val', val)
        let keys = Object.keys(val)
        if (keys.length) {
          this.currentFilterColumn = {}
        }
        this.columns.forEach((column) => {
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
    this.scrollBarWidth = this.wrapperWidth - this.tbodyWidth
    this.headerRealEl = this.$refs.header.$el.querySelector('thead')

    // console.log(this.wrapperWidth, this.tbodyWidth)

    this.init()

    // window.addEventListener('resize', this.init)
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.init)
  },
  methods: {
    initData () {
      this.copyData = this.data.slice(0).map((row, idx) => {
        return {
          row,
          _index: idx
        }
      })
    },
    computeAlign (column) {
      if (column.align) {
        return {
          'text-align': column.align
        }
      }
    },
    computeTdClass (column, params) {
      let className = []
      if (column.ellipsis) {
        className.push('n-advanced-table__td-text-ellipsis')
      }
      if (!column.className) {
        return className
      }
      if (typeof column.className === 'string') {
        className.push(column.className)
      } else if (typeof column.className === 'function') {
        className.push(column.className(params))
      }
      // console.log(className)
      return className
    },
    selectRow (rowIndexs = []) {
      this.$nextTick(() => {
        if (rowIndexs === 'all') {
          this.showingData.forEach((item) => {
            this.checkBoxes[item._index] = true
          })
          this.checkBoxes = [].concat(this.checkBoxes)
        } else {
          if (this.showingData.length > 0) {
            rowIndexs.forEach((idx) => {
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
        const ref = this.$refs['sorter_' + sorter.key][0]
        ref.setSort(sorter.type)
        // this.sortIndexs[sorter.key] = sorter.type
      } else {
        // clear
        this.clearSort()
      }
      this.currentFilterColumn &&
        Object.keys(this.currentFilterColumn).forEach((key) => {
          this.selectedFilter = {}
        })
      if (filter) {
        // ---- TODO: 未来版本将会去除这段代码,为了兼容老版本
        Object.keys(filter).forEach((key) => {
          let column = this.columns.find((item) => item.key === key)
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
      Object.keys(this.sortIndexs).forEach((key) => {
        this.sortIndexs[key] = 0
      })
      this.currentSortColumn = null
    },
    onBodyScrolll (event) {
      this.headerRealEl.style.transform = `translate3d(-${event.target.scrollLeft}px,0,0)`

      // this.$refs.header.$el.scrollLeft = event.target.scrollLeft

      event.stopPropagation()
    },
    computeCustomWidthStl (column) {
      if (column.width) {
        let width = column.width
        return {
          width: width + 'px',
          'padding-right': this.scrollBarWidth + 'px'
          // minWidth: width + 'px'
        }
      } else if (column.type === 'selection') {
        let width = 60
        return {
          width: width + 'px',
          'padding-right': this.scrollBarWidth + 'px'
          // minWidth: width + 'px'
        }
      }
      return null
    },
    init () {
      this.$nextTick(() => {
        this.wrapperWidth = this.$refs.tableWrapper.offsetWidth

        // console.log(this.relTable.offsetWidth)

        // this.scrollBarWidth = 5
      })
    },
    onAllCheckboxesClick () {
      console.log(
        'TCL: onAllCheckboxesClick -> this.allCheckboxesSelect',
        this.allCheckboxesSelect
      )

      this.showingData.forEach((item) => {
        this.checkBoxes[item._index] = this.allCheckboxesSelect
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

      keys.forEach((key) => {
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
      let currentSortColumn = null
      let keys = Object.keys(this.currentSortColumn)
      currentSortColumn = {}

      keys.forEach((key) => {
        let val = this.currentSortColumn[key].value
        let sortable = this.currentSortColumn[key].sortable
        if (sortable === 'custom') {
          currentSortColumn[key] = {
            value: val
          }
        }
      })
      if (Object.keys(currentSortColumn).length === 0) {
        currentSortColumn = null
      }
      return currentSortColumn
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
        this.onChange(emitData)
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
        Object.keys(this.currentFilterColumn).forEach((key) => {
          const { value, filterFn } = this.currentFilterColumn[key]
          if (value && filterFn !== 'custom') {
            data = data.filter((item) => {
              return filterFn(value, item.row)
            })
          }
        })
      }
      // compute search
      if (this.currentSearchColumn && this.search.onSearch !== 'custom') {
        const { key, word } = this.currentSearchColumn
        data = data.filter((item) => {
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
        Object.keys(this.sortIndexs).forEach((key) => {
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
    onSortTypeChange ({ i, sortable, key, type, column }) {
      this.currentSortColumn = {
        sortable,
        key,
        type,
        column,
        i
      }
      if (this.onChange && sortable === 'custom') {
        this.useRemoteChange()
      }
      this.$emit('on-sort-change', this.currentSortColumn)
    }
  }
}
</script>
