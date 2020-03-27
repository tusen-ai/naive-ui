# Controlled Filter

```html
<n-button @click="filterAddress">Filter Address(Use Value 'London')</n-button>
<n-button @click="unfilterAddress">Clear Address Filters</n-button>
<n-data-table
  ref='table'
  :columns='columns'
  :data='data'
  :pagination='pagination'
  @filters-change="handleFiltersChange"
/>
```

```js
const addressColumn = {
  title: 'Address',
  key: 'address',
  filterMultiple: false,
  filterOptionValues: [],
  sorter: 'default',
  filterOptions: [
    {
      label: 'London',
      value: 'London'
    },
    {
      label: 'New York',
      value: 'New York'
    }
  ],
  filter (value, row) {
    return ~row.address.indexOf(value)
  }
}

const columns = [
  {
    title: 'Name',
    key: 'name',
    sorter (rowA, rowB) {
      return rowA.name.length - rowB.name.length
    }
  },
  {
    title: 'Age',
    key: 'age',
    sorter (rowA, rowB) {
      return rowA.age - rowB.age
    }
  },
  addressColumn
]

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

export default {
  data () {
    return {
      data: data,
      columns,
      addressColumn,
      pagination: { pageSize: 5 }
    }
  },
  methods: {
    filterAddress () {
      this.addressColumn.filterOptionValues = ['London']
    },
    unfilterAddress () {
      this.addressColumn.filterOptionValues = []
    },
    handleFiltersChange (filters, sourceColumn) {
      console.log(filters, sourceColumn)
      this.addressColumn.filterOptionValues = filters[sourceColumn.key]
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```