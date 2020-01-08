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
  activeFilterOptionValues: [],
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
  filter (value, record) {
    return ~record.address.indexOf(value)
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
      this.addressColumn.activeFilterOptionValues = ['London']
    },
    unfilterAddress () {
      this.addressColumn.activeFilterOptionValues = []
    },
    handleFiltersChange (filters, sourceColumn) {
      this.addressColumn.activeFilterOptionValues = filters.filter(
        filter => filter.columnKey === sourceColumn.key
      ).map(filter => filter.filterOptionValue)
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```