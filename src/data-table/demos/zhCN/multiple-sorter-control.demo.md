# 多列排序受控

```html
<n-space vertical :size="12">
  <n-data-table
    ref="table"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    @update:sorter="handleSortChange"
  />
</n-space>
```

```js
const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Chinese Score',
    key: 'chinese',
    sortOrder: false,
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3
    }
  },
  {
    title: 'Math Score',
    sortOrder: false,
    key: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2
    }
  },
  {
    title: 'English Score',
    sortOrder: false,
    key: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1
    }
  },
  {
    title: 'Address',
    key: 'address',
    defaultFilterOptionValues: ['London', 'New York'],
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
    address: 'New York No. 1 Lake Park',
    chinese: 98,
    math: 60,
    english: 70
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    chinese: 88,
    math: 99,
    english: 89
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
    handleSortChange (sorter) {
      console.log(
        '🚀 ~ file: multiple-sorter-control.demo.md ~ line 122 ~ handleSortChange ~ args',
        sorter
      )
    },
    filterAddress () {
      this.$refs.table.filter({
        address: ['London']
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
