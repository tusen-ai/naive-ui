# Selection

Rows can be selectable by making first column's type as `selection`.

```html
<div>You have selected {{ checkedRowKeys.length }} row{{ checkedRowKeys.length < 2 ? '': 's'}}.</div>

<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  @checked-row-keys-change="handleCheck"
/>
```

```js
const columns = [
  {
    type: 'selection',
    disabled (row, index) {
      return row.name === 'Edward King 3'
    }
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
]

const data = Array.apply(null, { length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))

export default {
  data() {
    return {
      data,
      columns,
      checkedRowKeys: [],
      pagination: {
        pageSize: 5
      }
    }
  },
  methods: {
    sendMail(rowData) {
      this.$NMessage.info('send mail to ' + rowData.name)
    },
    handleCheck (rowKeys) {
      this.checkedRowKeys = rowKeys
    }
  }
}
```
