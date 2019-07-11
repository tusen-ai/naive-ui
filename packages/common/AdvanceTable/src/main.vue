<template>
  <div
    ref="tableWrapper"
    class="n-advance-tabel__wrapper"
  >
    <div class="n-advance-table__operation">
      <section class="n-advance-table__operation__bacth" />
      <div class="n-advance-table__operation__custom" />
      <div class="n-advance-table__operation__search">
        <searchInput
          v-if="search"
          :options="search"
          @on-change="handleSearch"
        />
      </div>
    </div>
    <n-table
      style="padding:0;border-bottom-left-radius:0;border-bottom-right-radius:0;"
      :style="colGroup"
    >
      <colgroup>
        <col
          v-for="(column, i) in columns"
          :key="i"
          :style="colStl"
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
            :key="column.key"
          >
            {{ column.title }}
            <SortIcon
              v-if="column.sortable"
              v-model="sortIndexs[i]"
              @onSortTypeChange="
                type =>
                  onSortTypeChange({i, sortable:column.sortable, key:column.key, type, column})
              "
            />

            <!-- 优先自定义 -->
            {{ column.filterDropdown && column.filterDropdown() }}
            <!-- 否则默认渲染 -->
            <sortDropDown
              v-if="column.filterItems && !column.filterDropdown"
              :filter-items="column.filterItems"
              :filter-multiple="column.filterMultiple || false"
              @on-filter="(value)=>onFilter(value,column.onFilter)"
            />
          </n-th>
          <span
            v-if="scrollBarWidth"
            :style="'padding-left:' + scrollBarWidth + 'px;' + 'visibility:hidden;'"
            rowspan="1"
          />
        </n-tr>
      </n-thead>
    </n-table>
    <n-table
      ref="tbody"
      :style="tableStl"
      style="border-top-left-radius:0;border-top-right-radius:0;"
    >
      <colgroup>
        <col
          v-for="(column, i) in columns"
          :key="i"
          :style="colStl"
        >
      </colgroup>
      <n-tbody>
        <n-tr
          v-for="(rowData, i) in showingData"
          :key="i"
        >
          <n-td
            v-for="column in columns"
            :key="column.key"
          >
            <row
              :index="i"
              :row="rowData"
              :key-name="column.key"
              :render="column.render"
            />
          </n-td>
        </n-tr>
      </n-tbody>
    </n-table>
    <!-- 分页 -->
    <div class="n-advanced-table__pagination">
      <n-pagination
        v-if="pagination!==false && showingData.length"
        v-model="currentPage"
        :page-count="pageCount"
      />
    </div>
  </div>
</template>

<script>
import row from '../row/index.js'
import SortIcon from '../sortIcon'
import sortDropDown from '../sortDropDown'
import searchInput from '../searchInput'

export default {
  name: 'NAdvanceTable',
  components: {
    row,
    SortIcon,
    sortDropDown,
    searchInput
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
      default: null
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
    }
  },
  data () {
    const sortIndexs = new Array(this.columns.length).fill(0)
    return {
      copyData: this.data.slice(0),
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
        'overflow': 'auto',
        ...this.colGroup
      }
      if (this.maxHeight) {
        stl.maxHeight = typeof this.maxHeight === 'number' ? this.maxHeight + 'px' : this.maxHeight
      }
      if (this.maxWidth) {
        stl.maxWidth = typeof this.maxWidth === 'number' ? this.maxWidth + 'px' : this.maxWidth
      }
      return stl
    },
    colGroup () {
      return { width: `${this.wrapperWidth}px` }
    },
    headColStl () {
      return {
        width: this.tbodyWidth / this.columns.length + 'px',
        'padding-right': this.scrollBarWidth + 'px'
      }
    },
    colStl () {
      return {
        width: this.wrapperWidth / this.columns.length + 'px'
      }
    }
  },
  watch: {
    currentPage () {
      if (this.pagination.custom === true) { this.useRemoteChange() }
      this.$emit('on-page-change', this.paginationer)
    },
    data () {
      this.copyData = this.data.slice(0)
      this.searchData = []
    },
    currentSearchColumn () {
      this.searchData = this.computeShowingData()
      // because after search ,length maybe change , so need to reset current page
      this.currentPage = 1
    },
    currentSortColumn () {
      this.searchData = this.computeShowingData()
    },
    currentFilterColumn () {
      this.searchData = this.computeShowingData()
      // because after filter length maybe change , so need to reset current page
      this.currentPage = 1
    }
  },
  mounted () {
    this.wrapper = this.$refs.tableWrapper
    this.wrapperWidth = this.$refs.tableWrapper.offsetWidth
    this.tbodyWidth = this.$refs.tbody.$el.scrollWidth
    this.scrollBarWidth = this.wrapperWidth - this.tbodyWidth
  },
  methods: {
    handleSearch ({ key, word }) {
      console.log(key, word)
      this.currentSearchColumn = {
        key, word
      }
      if (word.length === 0) {
        this.currentSearchColumn = null
      }
      if (this.search.onSearch === 'custom') { this.useRemoteChange() }
    },
    useRemoteChange () {
      this.onChange({
        filter: this.currentFilterColumn,
        sorter: this.currentSortColumn,
        pagination: this.paginationer,
        search: this.currentSearchColumn
      })
    },
    computeShowingData () {
      let data = this.copyData
      // compute filter
      if (this.currentFilterColumn) {
        const { value, filterFn } = this.currentFilterColumn
        if (value === null) {
          this.filterStatus = false
          this.searchData = []
        } else {
          this.filterStatus = true
        }
        if (value && filterFn !== 'custom') {
          data = data.filter((item) => {
            return filterFn(value, item)
          })
        }
      }
      // compute search
      if (this.currentSearchColumn && this.search.onSearch !== 'custom') {
        const { key, word } = this.currentSearchColumn
        data = data.filter((item) => {
          return this.search.onSearch(key, word, item)
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
      let { i, sortable, key, type, column } = this.currentSortColumn
      // use remote sort
      if (sortable === true) {
        if (!this.searchDataNoSort) { this.searchDataNoSort = data.slice(0) }
        if (type === 0) {
          if (this.searchDataNoSort) {
            data = this.searchDataNoSort
            this.searchDataNoSort = null
          }
        } else {
          data = data.sort((a, b) => {
            if (column.sorter) {
              return column.sorter(a, b)
            }
            if (type > 0) {
              return ('' + a[key]).localeCompare('' + b[key])
            } else {
              return ('' + b[key]).localeCompare('' + a[key])
            }
          })
        }
      }
      if (type !== 0) {
        this.sortIndexs = this.sortIndexs.map((item, idx) => {
          if (idx !== i) {
            return 0
          } else {
            return this.sortIndexs[idx]
          }
        })
      }
      return data
    },
    onFilter (value, filterFn) {
      this.currentFilterColumn = {
        value,
        filterFn
      }
      if (value === null) {
        this.currentFilterColumn = null
      }
      if (filterFn === 'custom') {
        // remote filter
        this.useRemoteChange()
      }
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
<style scoped>
.n-advance-table__operation{
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
}
</style>
