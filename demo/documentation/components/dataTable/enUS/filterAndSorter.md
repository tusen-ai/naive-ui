# Filter and sorter

```html
<n-button @click='sortName'>Sort By Name (Ascend)</n-button>
<n-button @click='filterAddress'>Filter Address London</n-button>
<n-button @click='clearFilters'>Clear Filters</n-button>
<n-button @click='clearSorter'>Clear Sorter</n-button>
<n-button @click='useRouteParams'>Use Query from Route</n-button>
<n-data-table
  ref='table'
  :columns='columns'
  :data='data'
  :pagination='pagination'
/>
```

```js
const columns = [
  {
    title: 'Name',
    key: 'name',
    sortable: true,
    sorter (rowA, rowB) {
      return rowA.name.length - rowB.name.length
    }
  },
  {
    title: 'Age',
    key: 'age',
    sortable: true,
    sorter (rowA, rowB) {
      return rowA.age - rowB.age
    }
  },
  {
    title: 'Address',
    key: 'address',
    filterable: true,
    filterMultiple: true,
    defaultFilter: ['London', 'New York'],
    filterItems: [
      {
        label: 'London',
        value: 'London'
      },
      {
        label: 'New York',
        value: 'New York'
      }
    ],
    filter (value, record) {
      return record.address.indexOf(value) >= 0
    }
  }
]

const data = [
  {
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

export default {
  watch: {
    $route (value) {
      const {
        sortColumnKey,
        order,
        filterColumnKey,
        filterOptionValue
      } = value.query
      if (sortColumnKey) {
        this.$refs.table.sort(sortColumnKey, order)
      }
      if (filterColumnKey) {
        this.$refs.table.filter({
          columnKey: filterColumnKey,
          filterOptionValue
        })
      }
    }
  },
  data () {
    return {
      data: data,
      columns,
      selectedData: []
    }
  },
  computed: {
    pagination () {
      return { limit: 5 }
    }
  },
  methods: {
    filterAddress () {
      this.$refs.table.filter({
        columnKey: 'address',
        filterOptionValue: 'London'
      })
    },
    sortName () {
      this.$refs.table.sort('name', 'ascend')
    },
    clearFilters () {
      this.$refs.table.filter(null)
    },
    clearSorter () {
      this.$refs.table.sort(null)
    },
    useRouteParams () {
      this.$router.push({
        path: this.$route.path,
        hash: '#filter-and-sorter',
        query: {
          sortColumnKey: 'age',
          order: 'descend',
          filterColumnKey: 'address',
          filterOptionValue: 'London'
        }
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