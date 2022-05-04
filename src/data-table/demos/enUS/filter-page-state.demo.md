# Filter page state

Configure `filter-page-state` to control whether the filtered page stays on the current page or the first page.

Note that: If the setting stays on the current page and the total amount of filtered data cannot reach the current page, the page will display no data.

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
