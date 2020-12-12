# 受控的分页

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
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
        page: 2,
        pageSize: 5,
        showSizePicker: true,
        pageSizes: [3, 5, 7],
        onChange: (page) => {
          this.pagination.page = page
        },
        onPageSizeChange: (pageSize) => {
          this.pagination.pageSize = pageSize
        }
      }
    }
  }
}
```
