# 多列排序受控

```html
<n-space vertical :size="12">
  <n-data-table
    ref="table"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</n-space>
```

```js
import { h } from 'vue'

const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: () => h('span', { id: 'age-title' }, 'Age'),
    key: 'age',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: () => h('span', { id: 'chinese-title' }, 'Chinese Score'),
    key: 'chinese',
    defaultSortOrder: false,
    className: 'chinese-col',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3
    }
  },
  {
    title: () => h('span', { id: 'math-title' }, 'Math Score'),
    defaultSortOrder: false,
    className: 'math-col',
    key: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2
    }
  },
  {
    title: () => h('span', { id: 'english-title' }, 'English Score'),
    className: 'english-col',
    defaultSortOrder: false,
    key: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1
    }
  }
]

const data = [
  {
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    chinese: 98,
    math: 60,
    english: 70
  },
  {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
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
