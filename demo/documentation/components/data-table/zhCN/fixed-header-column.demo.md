# 固定头部和列

展示大量多列数据的解决方式。

注意：如果设定了固定的列，你需要同时设定 `scroll-x`。

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
import { h } from 'vue'

const columns = [
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left'
  },
  {
    title: 'Age',
    key: 'age',
    width: 100
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
    }
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right'
  }
]

const data = Array.apply(null, { length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))

export default {
  inject: ['message'],
  data () {
    return {
      data,
      columns
    }
  },
  computed: {
    pagination () {
      return { pageSize: 10 }
    }
  },
  methods: {
    sendMail (rowData) {
      this.message.info('send mail to ' + rowData.name)
    }
  }
}
```
