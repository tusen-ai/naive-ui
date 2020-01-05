# Ellipsis

> Ellipsize cell content via setting `column.ellipsis`.

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
      key: "address",
      width: 100,
      ellipsis: true
    },
    {
      title: "Another Address",
      key: "anotherAddress",
      width: 100,
      ellipsis: true
    },
    {
      title: "Action",
      key: "actions",
      render(h, params) {
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
    anotherAddress: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    anotherAddress: "New York No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    anotherAddress: "New York No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
]
export default {
  data() {
    return {
      data: data,
      columns: createColumns(this),
      pagination: { limit: 10 }
    }
  },
  methods: {
    sendMail(rowData) {
      this.$NMessage.info("Send mail to " + rowData.name)
    }
  }
}
```
