# 过滤后页面状态

配置 `filter-page-state` 控制过滤后的页面停留在当前页还是首页

注意：如果设置停留在当前页，过滤后的数据总数达不到当前页时，页面会无数据展示

```html
<n-space vertical :size="12">
  <n-data-table
    filter-page-state="first"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

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
    sorter: (row1, row2) => row1.age - row2.age
  },
  {
    title: 'Address',
    key: 'address',
    defaultFilterOptionValues: [],
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
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 4,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

export default defineComponent({
  setup () {
    const tableRef = ref(null)

    return {
      table: tableRef,
      data,
      columns,
      pagination: { pageSize: 3 }
    }
  }
})
```
