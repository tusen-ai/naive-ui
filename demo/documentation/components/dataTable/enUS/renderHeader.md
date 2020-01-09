# Custom render column header

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
/>
```

```js
const renderTooltip = (h, activator, content) => {
  const scopedSlots = {
    activator: () => activator
  }
  return (
    <n-tooltip arrow scopedSlots={scopedSlots}>
      {content}
    </n-tooltip>
  )
}

const createColumns = instance => {
  return [
    {
      title: "Name",
      key: "name",
      renderHeader(h, column) {
        return renderTooltip(
          h,
          <n-gradient-text size="24" type="danger">
            {column.title}
          </n-gradient-text>,
          "custom header: name"
        )
      }
    },
    {
      title: "Age",
      key: "age",
      renderHeader(h, column) {
        return (
          <n-gradient-text size="20" type="info">
            {column.title}
          </n-gradient-text>
        )
      }
    },
    {
      title: "Address",
      key: "address",
      renderHeader(h, column) {
        return (
          <n-gradient-text size="16" type="warning">
            {column.title}
          </n-gradient-text>
        )
      }
    },
    {
      title: "Tags",
      key: "tags",
      render (h, params) {
        const arr = params.tags.map(tagKey => {
          return (
            <n-tag
              style="margin-right:5px"
              type={tagKey.length > 5 ? "warning" : "default"}
            >
              {tagKey}
            </n-tag>
          )
        })
        return arr
      }
    },
    {
      title: "Action",
      key: "actions",
      render (h, params) {
        return (
          <n-button size="small" onClick={() => instance.sendMail(params)}>
            Send mail
          </n-button>
        )
      }
    }
  ]
}

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
]
export default {
  data() {
    return {
      data: data,
      columns: createColumns(this)
    }
  },
  computed: {
    pagination() {
      return { total: this.data.length, pageSize: 10 }
    }
  },
  methods: {
    sendMail(rowData) {
      this.$NMessage.info("send mail to " + rowData.name)
    }
  }
}
```
