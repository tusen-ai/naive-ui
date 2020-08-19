# 非受控过滤 & 排序

```html
<n-button @click='sortName'>Sort By Name (Ascend)</n-button>
<n-button @click='filterAddress'>Filter Address (London)</n-button>
<n-button @click='clearFilters'>Clear Filters</n-button>
<n-button @click='clearSorter'>Clear Sorter</n-button>
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
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Age',
    key: 'age',
    sorter: (row1, row2) => row2.age - row1.age
  },
  {
    title: 'Address',
    key: 'address',
    defaultFilterOptionValues: [ 'London', 'New York' ],
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
      pagination: { pageSize: 5 }
    }
  },
  methods: {
    filterAddress () {
      this.$refs.table.filter({
        address: [ 'London' ]
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
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```