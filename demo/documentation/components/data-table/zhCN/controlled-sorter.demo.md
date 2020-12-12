# 受控的排序

如果列对象的 `sortOrder` 属性被设为 `'ascend'`、`'descend'` 或者 `false`，表格的排序将为受控状态。如果很多列的 `sortOrder` 都被设定了，那么只有他们之中的第一列会生效。

```html
<n-button @click="sortName('ascend')">Sort By Name (Ascend)</n-button>
<n-button @click="sortName('descend')">Sort By Name (Descend)</n-button>
<n-button @click="clearSorter">Clear Sorter</n-button>
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  @update:sorter="handleSorterChange"
/>
```

```js
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
  sorter(rowA, rowB) {
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
    filter(value, row) {
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

export default {
  data() {
    return {
      data: data,
      columns,
      nameColumn,
      ageColumn,
      pagination: { pageSize: 5 }
    }
  },
  methods: {
    sortName(order) {
      this.nameColumn.sortOrder = order
    },
    clearSorter() {
      this.nameColumn.sortOrder = false
      this.ageColumn.sortOrder = false
    },
    handleSorterChange(sorter) {
      this.columns.forEach((column) => {
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
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```
