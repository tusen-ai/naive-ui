# Controlled sorter

If one of the column objects' `sortOrder` is set to `'ascend'`, `'descend'` or `false`. The sorting behavior the table will be in a controlled manner. If multiple columns' `sortOrder` are set to `'ascend'` or `'descend'`, only first column of them will be applied.

```html
<n-space vertical :size="12">
  <n-space>
    <n-button @click="sortName('ascend')">Sort By Name (Ascend)</n-button>
    <n-button @click="sortName('descend')">Sort By Name (Descend)</n-button>
    <n-button @click="clearSorter">Clear Sorter</n-button>
  </n-space>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    @update:sorter="handleSorterChange"
  />
</n-space>
```

```js
import { defineComponent, reactive, ref } from 'vue'

const nameColumn = {
  title: 'Name',
  key: 'name',
  sortOrder: false,
  sorter: 'default'
}

const ageColumn = {
  title: 'Age',
  key: 'age',
  sortOrder: false,
  sorter (rowA, rowB) {
    return rowA.age - rowB.age
  }
}

const columns = [
  nameColumn,
  ageColumn,
  {
    title: 'Address',
    key: 'address',
    defaultFilter: ['London', 'New York'],
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
      return row.address.indexOf(value) >= 0
    }
  }
]

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 38,
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
    age: 36,
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
    const nameColumnReactive = reactive(nameColumn)
    const ageColumnReactive = reactive(ageColumn)
    const columnsRef = ref(columns)

    return {
      data,
      columns: columnsRef,
      nameColumn: nameColumnReactive,
      ageColumn: ageColumnReactive,
      pagination: { pageSize: 5 },
      sortName (order) {
        nameColumnReactive.sortOrder = order
      },
      clearSorter () {
        nameColumnReactive.sortOrder = false
        ageColumnReactive.sortOrder = false
      },
      handleSorterChange (sorter) {
        columnsRef.value.forEach((column) => {
          /** column.sortOrder !== undefined means it is uncontrolled */
          if (column.sortOrder === undefined) return
          if (!sorter) {
            column.sortOrder = false
            return
          }
          if (column.key === sorter.columnKey) column.sortOrder = sorter.order
          else column.sortOrder = false
        })
      }
    }
  }
})
```
