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
  },
  {
    title: 'Tags',
    key: 'tags',
    render (h, row) {
      const tags = row.tags.map(tagKey => {
        return (
          <n-tag
            style='margin-right:5px'
            type={tagKey.length > 5 ? 'warning' : 'default'}
          >
            {tagKey}
          </n-tag>
        )
      })
      return tags
    }
  }
]

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
  data() {
    return {
      data,
      columns,
      pagination: {
        page: 2,
        pageCount: data.length,
        pageSize: 1,
        onChange: page => {
          this.pagination.page = page
        }
      }
    }
  },
  methods: {
  }
}
```
