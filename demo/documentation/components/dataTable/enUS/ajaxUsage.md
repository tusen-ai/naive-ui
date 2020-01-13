# Ajax

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :loading="loading"
  :pagination="pagination"
  @sorter-change="handleSorterChange"
  @filters-change="handleFiltersChange"
  @page-change="handlePageChange"
/>
```

```js
const nameColumn = {
  title: 'Name',
  key: 'name',
  sorter: true,
  sortOrder: false,
  render (h, row) {
    return h('span', [row.name.first, ' ', row.name.last])
  }
}

const genderColumn = {
  title: 'Gender',
  key: 'gender',
  filterable: true,
  filterOptionValues: [],
  filterOptions: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]
}

const columns = [
  nameColumn,
  genderColumn,
  {
    title: 'Email',
    key: 'email'
  }
]

function createQueryString (querys) {
  const queryString = Object.keys(querys).map(key => `${key}=${querys[key]}`).join('&')
  return queryString ? '?' + queryString : ''
}

export default {
  data () {
    return {
      data: [],
      columns,
      nameColumn,
      genderColumn,
      pagination: {
        page: 1,
        pageCount: 100,
        pageSize: false
      },
      loading: false,
    }
  },
  mounted () {
    this.getData().then(data => {
      this.data = data.results
    })
  },
  methods: {
    getData (params = {}) {
      this.loading = true
      !params.results && (params.results = 8)
      const URL = 'https://randomuser.me/api' + createQueryString(params)
      return fetch(URL)
        .then(res => res.json())
        .finally(() => {
          this.loading = false
        })
    },
    handleSorterChange (sorter) {
      if (!sorter) {
        this.nameColumn.sortOrder = false
        this.getData().then(data => {
          this.data = data.results
        })
        return
      }
      if (sorter.columnKey === 'name') {
        this.getData().then(data => {
          this.data = data.results
          this.nameColumn.sortOrder = sorter.sortOrder
        })
      }
    },
    handleFiltersChange (filters, initiatorColumn) {
      this.getData().then(data => {
        this.data = data.results
        if (initiatorColumn.key === 'gender') {
          this.genderColumn.filterOptionValues = filters
            .filter(filter => filter.columnKey === 'gender')
            .map(filter => filter.filterOptionValue)
        }
      })
    },
    handlePageChange (currentPage) {
      this.getData({
        page: currentPage
      }).then(data => {
        this.data = data.results
        this.pagination.page = currentPage
      })
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```
