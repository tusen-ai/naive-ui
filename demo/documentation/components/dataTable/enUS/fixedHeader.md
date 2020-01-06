# Fixed Header

Display large amounts of data in scrollable view.

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  max-height="250px"
  @select="onSelectedChange"
/>
```

```js
const columns = [
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

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  })
}

export default {
  data() {
    return {
      data: data,
      columns,
      selectedData: []
    }
  },
  computed: {
    pagination() {
      return { pageSize: 10 }
    }
  },
  methods: {
    sendMail(rowData) {
      this.$NMessage.info("send mail to " + rowData.name)
    },
    onSelectedChange(selectedData) {
      this.selectedData = selectedData
    }
  }
}
```
