# Fixed Header

Display large amounts of data in scrollable view by set `max-height`.

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  max-height="250px"
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
  data() {
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
      this.$NMessage.info('send mail to ' + rowData.name)
    }
  }
}
```
