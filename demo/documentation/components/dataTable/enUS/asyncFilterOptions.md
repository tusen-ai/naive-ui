# Async Filter Options
```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
/>
```

```js
const createFilterOptions = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: "London",
          value: "London"
        },
        {
          label: "New York",
          value: "New York"
        }
      ])
    }, 10000)
  })
}

const columns = [
  {
    title: "Name",
    key: "name"
  },
  {
    title: "Age",
    key: "age",
    defaultSortOrder: "ascend"
  },
  {
    title: "Address",
    key: "address",
    filterable: true,
    defaultFilter: "London",
    asyncFilterOptions() {
      return createFilterOptions().then(list => {
        return list
      })
    },
    filter(value, record) {
      return record.address.indexOf(value) >= 0
    }
  }
]

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park"
  }
]
export default {
  data() {
    return {
      data,
      columns
    }
  },
  computed: {
    pagination() {
      return { limit: 5 }
    }
  }
}
```
