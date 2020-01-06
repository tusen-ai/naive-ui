# Controlled Pagination

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
/>
```

```js
const createColumns = instance => {
  return [
    {
      title: "Name",
      key: "name"
    },
    {
      title: "Age",
      key: "age"
    },
    {
      title: "Address",
      key: "address"
    },
    {
      title: "Tags",
      key: "tags",
      render (h, row) {
        const tags = row.tags.map(tagKey => {
          return (
            <n-tag
              style="margin-right:5px"
              type={tagKey.length > 5 ? "warning" : "default"}
            >
              {tagKey}
            </n-tag>
          )
        })
        return tags
      }
    },
    {
      title: "Action",
      key: "actions",
      render (h, row) {
        return (
          <n-button size="small">
            Oops
          </n-button>
        )
      }
    }
  ]
}

const data = [
  {
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
]

export default {
  data() {
    return {
      data,
      columns: createColumns(this),
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
