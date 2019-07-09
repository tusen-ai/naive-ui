<template>
  <div
    ref="tableWrapper"
    class="n-advance-tabel__wrapper"
  >
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
            :style="'padding-left:' + scrollBarWidth + 'px'"
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
  </div>
</template>

<script>
import row from '../row/index.js'
import SortIcon from '../sortIcon'
import sortDropDown from '../sortDropDown'

export default {
  name: 'NAdvanceTable',
  components: {
    row,
    SortIcon,
    sortDropDown
  },
  props: {
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
      currentFilterColumn: null
    }
  },
  computed: {
    showingData () {
      if (this.searchData.length) {
        return this.searchData
      } else {
        return this.copyData
      }
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
    data () {
      this.copyData = this.data.slice(0)
      this.searchData = []
    },
    currentSortColumn () {
      this.searchData = this.computeShowingData()
    },
    currentFilterColumn () {
      this.searchData = this.computeShowingData()
    }
  },
  mounted () {
    console.log(this.$refs.tableWrapper)
    this.wrapper = this.$refs.tableWrapper
    this.wrapperWidth = this.$refs.tableWrapper.offsetWidth
    this.tbodyWidth = this.$refs.tbody.$el.scrollWidth
    this.scrollBarWidth = this.wrapperWidth - this.tbodyWidth
  },
  methods: {
    useRemoteChange () {
      this.onChange({
        filter: this.currentFilterColumn,
        sorter: this.currentSortColumn,
        pagination: this.pagination
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

      // compute sort
      if (this.currentSortColumn) {
        data = this.computeSortData(data)
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
          console.log(idx, i)
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
      if (this.currentFilterColumn.filterFn === 'custom') {
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
