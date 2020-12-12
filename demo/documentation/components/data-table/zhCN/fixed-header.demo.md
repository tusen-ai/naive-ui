# 固定头部

在展示大量数据的时候通过设定 `max-height` 来固定头部、滚动数据。

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :max-height="250"
/>
```

```js
const columns = [
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
  inject: ['message'],
  data () {
    return {
      data,
      columns,
      pagination: {
        pageSize: 15
      }
    }
  },
  methods: {
    sendMail (rowData) {
      this.message.info('send mail to ' + rowData.name)
    }
  }
}
```
