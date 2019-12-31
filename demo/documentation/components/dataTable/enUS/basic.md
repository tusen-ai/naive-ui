# Basic Usage

```html
<n-data-table
  ref="table"
  :columns="columns"
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
      columns: _columns(this)
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
    }
  }
};
```
