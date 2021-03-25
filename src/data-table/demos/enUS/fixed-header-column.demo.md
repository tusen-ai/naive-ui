# Fixed header and column

A Solution for displaying large amounts of data with long columns.

Note that: If you have set fixed column, you should also set `scroll-x`.

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :max-height="250"
  :scroll-x="1800"
/>
```

```js
import { h, defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

const columns = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left'
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    fixed: 'left'
  },
  {
    title: 'Row',
    key: 'row',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row1',
    key: 'row1',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row2',
    key: 'row2',
    render (row, index) {
      return h('span', ['row ', index])
    },
    width: 100,
    fixed: 'right'
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right'
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      data: Array.apply(null, { length: 46 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      })),
      columns,
      pagination: { pageSize: 10 },
      sendMail (rowData) {
        message.info('send mail to ' + rowData.name)
      }
    }
  }
})
```
