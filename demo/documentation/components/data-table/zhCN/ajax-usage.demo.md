# 异步

```html
<n-data-table
  remote
  ref="table"
  :columns="columns"
  :data="data"
  :loading="loading"
  :pagination="pagination"
  :paging="false"
  :row-key="rowKey"
  @update:sorter="handleSorterChange"
  @update:filters="handleFiltersChange"
  @update:page="handlePageChange"
/>
```

```js
const Column1 = {
  title: 'Column1',
  key: 'column1',
  sorter: true,
  sortOrder: false
}

const Column2 = {
  title: 'Column2',
  key: 'column2',
  filter: true,
  filterOptionValues: [],
  filterOptions: [
    { label: 'Value1', value: 1 },
    { label: 'Value2', value: 2 }
  ]
}

const columns = [
  Column1,
  Column2,
  {
    title: 'Column3',
    key: 'column3'
  }
]

const data = Array.apply(null, { length: 987 }).map((_, index) => {
  return {
    column1: index,
    column2: index % 2 + 1,
    column3: 'a' + index
  }
})


function query (page, pageSize = 10, order = 'ascend', filterValues = []) {
  return new Promise(resolve => {
    const copiedData = data.map(v => v)
    const orderedData = order === 'descend' ? copiedData.reverse() : copiedData
    const filteredData = filterValues.length ? 
      orderedData.filter(row => filterValues.includes(row.column2)) :
      orderedData
    const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize)
    const pageCount = Math.ceil(filteredData.length / pageSize)
    setTimeout(() => resolve({
      pageCount,
      data: pagedData
    }), 1500)
  })
}

export default {
  data () {
    return {
      data: [],
      columns,
      Column1,
      Column2,
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 10
      },
      loading: true,
    }
  },
  mounted () {
    query(
      this.pagination.page,
      this.pagination.pageSize,
      this.Column1.sortOrder,
      this.Column2.filterOptionValues
    ).then(data => {
      this.data = data.data
      this.pagination.pageCount = data.pageCount
      this.loading = false
    })
  },
  methods: {
    rowKey (rowData) {
      return rowData.column1
    },
    handleSorterChange (sorter) {
      if (!sorter || sorter.columnKey === 'column1') {
        if (!this.loading) {
          this.loading = true
          query(
            this.pagination.page,
            this.pagination.pageSize,
            !sorter ? false : sorter.order,
            this.Column2.filterOptionValues
          ).then(data => {
            this.Column1.sortOrder = !sorter ? false : sorter.order,
            this.data = data.data
            this.pagination.pageCount = data.pageCount
            this.loading = false
          })
        }
      }
    },
    handleFiltersChange (filters) {
      if (!this.loading) {
        this.loading = true
        const filterValues = filters.column2 || []
        query(
          this.pagination.page,
          this.pagination.pageSize,
          this.Column1.sortOrder,
          filterValues
        ).then(data => {
          this.Column2.filterOptionValues = filterValues
          this.data = data.data
          this.pagination.pageCount = data.pageCount
          this.loading = false
        })
      }
    },
    handlePageChange (currentPage) {
      if (!this.loading) {
        this.loading = true
        console.log(currentPage)
        query(
          currentPage,
          this.pagination.pageSize,
          this.Column1.sortOrder,
          this.Column2.filterOptionValues
        ).then(data => {
          this.data = data.data
          console.log(data.data)
          this.pagination.page = currentPage
          this.pagination.pageCount = data.pageCount
          this.loading = false
        })
      }
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```
