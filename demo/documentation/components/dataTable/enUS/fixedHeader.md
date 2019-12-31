# Fixed Header

Display large amounts of data in scrollable view.

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  max-height="250px"
  @on-selected-change="onSelectedChange"
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
    }
  ];
};

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
      data: data,
      columns: _columns(this),
      selectedData: []
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
    onSelectedChange(selectedData) {
      this.selectedData = selectedData;
    }
  }
};
```
