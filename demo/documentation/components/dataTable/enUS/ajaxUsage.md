# Ajax

> filter,sorter,pagination should use `custom`

```html
<n-button @click="sortName">sort name</n-button>
<n-button @click="clearFilters">clear filters</n-button>
<n-button @click="clearFiltersAndSorters">clear filters and sorters</n-button>

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
  render (h, row) {
    return (
      <span>
        { row.name.first } { row.name.last }
      </span>
    )
  }
}

const columns = [
  nameColumn,
  {
    title: 'Gender',
    key: 'gender',
    filterable: true,
    filterOptions: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ]
  },
  {
    title: 'Email',
    key: 'email'
  }
]

export default {
  data () {
    return {
      data: [],
      columns,
      nameColumn,
      loading: false,
      total: 0
    }
  },
  mounted() {
    this.getData().then(data => {
      this.data = data.results
      this.total = 100
    })
  },
  computed: {
    pagination () {
      if (!this.total) return false
      return { pageCount: this.total, limit: false }
    }
  },
  methods: {
    getData (params = {}) {
      this.loading = true
      if (!params.results) {
        params.results = 8
      }
      let url = 'https://randomuser.me/api'
      let paramsArr = []
      Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
          params[key].forEach(value => {
            paramsArr.push(`${key}[]=${value}`)
          })
        } else paramsArr.push(`${key}=${params[key]}`)
      })
      if (paramsArr.length) {
        url = url + '?' + paramsArr.join('&')
      }
      return fetch(url)
        .then(res => res.json())
        .finally(() => {
          this.loading = false
        })
    },
    sortName () {
      this.$refs.table.sort('name', 'ascend')
    },
    handleSorterChange (sorter) {
      this.getData().then(data => {
        this.data = data.results
        this.total = 100
      })
    },
    handleFiltersChange (filters) {
      this.getData().then(data => {
        this.data = data.results
        this.total = 50
      })
    },
    handlePageChange (currentPage) {
      console.log('handle page change')
      this.getData({
        page: currentPage
      }).then(data => {
        this.data = data.results
        this.total = 50
      })
    },
    clearFilters () {
      this.$refs.table.clearFilters()
    },
    clearFiltersAndSorters () {
      this.$refs.table.clearFilters()
      this.$refs.table.clearSorter()
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```
