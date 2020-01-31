# Controlled Sorter
If property `sortOrder` of one of column objects is set to `'ascend'`, `'descend'` or `false`. The sorter of table will be in controlled mode. If multiple columns' `sortOrder` are set to `'ascend'` or `'descend'`, only first column of them will be applied.
```html
<n-button @click="sortName('ascend')">Sort By Name (Ascend)</n-button>
<n-button @click="sortName('descend')">Sort By Name (Descend)</n-button>
<n-button @click="clearSorter">Clear Sorter</n-button>
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  @sorter-change="handleSorterChange"
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

export default {
  data () {
    return {
      data: data,
      columns,
      nameColumn,
      ageColumn,
      pagination: { pageSize: 5 }
    }
  },
  methods: {
    sortName (order) {
      nameColumn.sortOrder = order
    },
    clearSorter () {
      nameColumn.sortOrder = false
    },
    handleSorterChange (sorter) {
      columns.forEach(column => {
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