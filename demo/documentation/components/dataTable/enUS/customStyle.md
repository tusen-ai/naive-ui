# Custom Style

> Row: Set row-class-name prop with a function to assign a class name to certain rows.
> Column: Set className key to columns prop's object to assign a class name to a certain column.

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :row-class-name="rowClassName"
/>
```

```js
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
      columns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age",
          className: "age"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Tags",
          key: "tags"
        }
      ]
    }
  },
  computed: {
    pagination() {
      return { limit: 10 }
    }
  },
  methods: {
    sendMail(row) {
      this.$NMessage.info("send mail to " + row.name)
    },
    rowClassName(row, index) {
      if (row.age > 32) {
        return "too-old"
      }
      return null
    }
  }
}
```

```css
/deep/ .too-old {
  color: red
}
/deep/ .age {
  background: skyblue
}
```
