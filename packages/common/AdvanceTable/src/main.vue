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
            <filterDropDown
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
            />
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
          :class="rowCls"
        >
          <n-td
            v-for="column in columns"
            :key="column.key"
            :style="computeAlign(column)"
            :class="computeTdClass(column, rowData)"
          >
            <row
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
            :svg="{ height: '150px', width: '250px' }"
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
import filterDropDown from '../filterDropDown'
import searchInput from '../searchInput'
import Loading from '../loading'
import { noopFn } from '../../../utils/index'
export default {
  name: 'NAdvanceTable',
  components: {
    row,
    SortIcon,
    filterDropDown,
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
    hoverColor: {
      default: '#323850',
      type: String
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    rowCls: {
      type: [Array, String, Object],
      default: ''
    },
    loading: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    const sortIndexs = {}
    this.columns.forEach((column, idx) => {
      sortIndexs[column.key || idx] = column.order ? column.order : 0
    })
    // const sortIndexs = new Array(this.columns.length).fill(0).map((item, idx) => {
    //   return this.columns[idx].order ? this.columns[idx].order : 0
    // })
    // console.log(sortIndexs)
    let copyData = this.data.slice(0).map((row, idx) => {
      return {
        row,
        _index: idx
      }
    })
    return {
      copyData,
      sortIndexs,
      wrapperWidth: 'unset',
      tbodyWidth: 'auto;',
      scrollBarWidth: '0',
      searchData: [],
      currentSortColumn: null,
      currentFilterColumn: null,
      currentSearchColumn: null,
      currentPage: 1
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
      return { width: `100%` }
    },
    // headColStl () {
    //   let width = (
    //     (this.wrapperWidth - this.scrollBarWidth) /
    //     this.columns.length
    //   ).toFixed(3)
    //   return ''
    //   return {
    //     width: width + 'px',
    //     'padding-right': this.scrollBarWidth + 'px',
    //     minWidth: width + 'px'
    //   }
    // },
    // colStl () {
    //   return ''
    //   let width = (
    //     (this.wrapperWidth - this.scrollBarWidth) /
    //     this.columns.length
    //   ).toFixed(3)
    //   return {
    //     width: width + 'px',
    //     minWidth: width + 'px'
    //   }
    // },
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
      this.copyData = this.data.slice(0).map((row, idx) => {
        return {
          row,
          _index: idx
        }
      })
      this.searchData = this.computeShowingData()
      this.searchDataNoSort = null
    },
    currentSearchColumn () {
      this.searchData = this.computeShowingData()
    },
    currentSortColumn () {
      this.searchData = this.computeShowingData()
      console.log('currentSortColumn')
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

  mounted () {
    this.relTable = this.$refs.tbody.$el.querySelector('table')
    this.wrapper = this.$refs.tableWrapper
    this.wrapperWidth = this.$refs.tableWrapper.offsetWidth
    this.tbodyWidth = this.relTable.offsetWidth
    this.scrollBarWidth = this.wrapperWidth - this.tbodyWidth
    // console.log(this.wrapperWidth, this.tbodyWidth)

    this.init()

    // window.addEventListener('resize', this.init)
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.init)
  },
  methods: {
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
      this.currentFilterColumn && Object.keys(this.currentFilterColumn).forEach(key => {
        const ref = this.$refs['filterDropDown_' + key][0]
        ref.reset()
        this.currentFilterColumn = null
      })
      if (filter) {
        Object.keys(filter).forEach((key) => {
          const ref = this.$refs['filterDropDown_' + key][0]
          ref.setCheckedIndexs(filter[key])
        })
      }
      if (searcher) {
        this.$refs.search.setSearch(searcher)
      } else {
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
      this.$refs.header.$el.scrollLeft = event.target.scrollLeft
      event.stopPropagation()
    },
    computeCustomWidthStl (column) {
      if (column.width) {
        let width = column.width
        return {
          width: width + 'px',
          'padding-right': this.scrollBarWidth + 'px',
          minWidth: width + 'px'
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
    useRemoteChange () {
      clearTimeout(this.remoteTimter)
      this.remoteTimter = setTimeout(() => {
        this.onChange({
          filter: this.currentFilterColumn,
          sorter: this.currentSortColumn,
          pagination: this.paginationer,
          search: this.currentSearchColumn
        })
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
        if (type === 0) {
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
        // this.sortIndexs.map((item, idx) => {
        //   if (idx !== i) {
        //     return 0
        //   } else {
        //     return this.sortIndexs[idx]
        //   }
        // })
      }
      return data
    },
    onFilter (value, key, filterFn) {
      if (this.currentFilterColumn === null) {
        this.currentFilterColumn = {}
      }
      this.$set(this.currentFilterColumn, key, { value, filterFn })
      // this.currentFilterColumn[key] = value
      if (value === null) {
        delete this.currentFilterColumn[key]
        if (Object.keys(this.currentFilterColumn).length === 0) {
          this.currentFilterColumn = null
        }
      }
      if (filterFn === 'custom') {
        // remote filter
        this.useRemoteChange()
      }
      console.log('on-filter')
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
    }
  }
}
</script>
