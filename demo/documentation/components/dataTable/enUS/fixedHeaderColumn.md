# Fixed header and column

A Solution for displaying large amounts of data with long columns.

Note that:

> Specify the width of columns if header and cell do not align properly. If specified width is not working or have gutter between columns, please try to leave one column at least without width to fit fluid layout, or make sure no long word to break table layout.A fixed value which is greater than table width for `scroll-x` is recommended. The sum of unfixed columns should not greater than `scroll-x`.

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  max-height="250px"
  :scroll-x="1800"
>
</n-data-table>
```

```js
const columns = [
  {
    title: "Name",
    key: "name",
    width: 200,
    fixed: "left"
  },
  {
    title: "Age",
    key: "age",
    width: 100
  },
  {
    title: "Row",
    key: "row",
    render(h, params, index) {
      return <span> row {index}</span>
    }
  },
  {
    title: "Row1",
    key: "row1",
    render(h, params, index) {
      return <span>row {index}</span>
    }
  },
  {
    title: "Row2",
    key: "row2",
    render(h, params, index) {
      return <span>row {index}</span>
    }
  },
  {
    title: "Address",
    key: "address",
    width: 200,
    fixed: "right"
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
      data,
      columns,
      selectedData: []
    }
  },
  computed: {
    pagination () {
      return { pageSize: 10 }
    }
  },
  methods: {
    sendMail(rowData) {
      this.$NMessage.info("send mail to " + rowData.name)
    }
  }
}
```
