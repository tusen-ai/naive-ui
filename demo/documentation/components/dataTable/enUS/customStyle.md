# Custom Style

> Row: Set row-class-name prop with a function to assign a class name to certain rows.
> Column: Set className key to columns prop's object to assign a class name to a certain column.

```html
Custom row styles:

<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :row-class-name="rowClassName"
>
</n-data-table>

Custom column styles:

<n-data-table
  ref="table"
  :columns="columns1"
  :data="data"
  :pagination="pagination"
>
</n-data-table>
```

```js
const _columns = $this => {
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
      render(h, params) {
        const arr = params.row.tags.map(tagKey => {
          return (
            <n-tag
              style="margin-right:5px;"
              type={tagKey.length > 5 ? "warning" : "default"}
            >
              {tagKey}
            </n-tag>
          );
        });
        return arr;
      }
    },
    {
      title: "Action",
      key: "actions",
      render(h, params) {
        return (
          <n-button size="small" onClick={() => $this.sendMail(params.row)}>
            Send mail
          </n-button>
        );
      }
    }
  ];
};

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
];
export default {
  data() {
    return {
      data: data,
      columns: _columns(this),
      columns1: [
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
    };
  },
  computed: {
    pagination() {
      return { total: this.data.length, limit: 10 };
    }
  },
  methods: {
    sendMail(rowData) {
      this.$NMessage.info("send mail to " + rowData.name);
    },
    rowClassName(params, index) {
      console.log("TCL: rowClassName -> row", params, index);
      if (params.row.age > 32) {
        return "too-old";
      }
      return "";
    }
  }
};
```

```css
/deep/ .too-old {
  color: red;
}
/deep/ .age {
  background: skyblue;
}
```
