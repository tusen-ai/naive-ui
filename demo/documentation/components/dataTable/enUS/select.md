# Selection

Rows can be selectable by making first column as a selectable column.

```html
You have selected {{ selectedRows.length }} row{{ selectedRows.length < 2 ? '': 's'}}.

<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  @select="handleSelect"
>
</n-data-table>
```

```js
const columns = [
  {
    type: "selection",
    disabled(params, index) {
      return params.name === "Edward King 3";
    }
  },
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
  }
]

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}
export default {
  data() {
    return {
      data,
      columns,
      selectedRows: []
    };
  },
  computed: {
    pagination() {
      return { total: this.data.length, limit: 5 }
    }
  },
  methods: {
    sendMail(rowData) {
      this.$NMessage.info("send mail to " + rowData.name)
    },
    handleSelect (rows) {
      this.selectedRows = rows
    }
  }
};
```
