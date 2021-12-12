# Controlled filter

```html
<n-space vertical :size="12">
  <n-space>
    <n-button @click="filterAddress"
      >Filter Address(Use Value 'London')</n-button
    >
    <n-button @click="unfilterAddress">Clear Address Filters</n-button>
  </n-space>
  <n-data-table
    ref="table"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    @update:filters="handleFiltersChange"
  />
</n-space>
```

```js
import { defineComponent, reactive } from 'vue'

const addressColumn = {
  title: 'Address',
  key: 'address',
  filterMultiple: false,
  filterOptionValue: null,
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

export default defineComponent({
  setup () {
    const addressColumnReactive = reactive(addressColumn)

    return {
      data,
      columns,
      addressColumn: addressColumnReactive,
      pagination: { pageSize: 5 },
      filterAddress () {
        addressColumnReactive.filterOptionValue = 'London'
      },
      unfilterAddress () {
        addressColumnReactive.filterOptionValue = null
      },
      handleFiltersChange (filters, sourceColumn) {
        addressColumnReactive.filterOptionValue = filters[sourceColumn.key]
      }
    }
  }
})
```
