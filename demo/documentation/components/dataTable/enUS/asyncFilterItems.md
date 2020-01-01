# Async filter items

```html
<n-data-table
  style="margin-top:10px;"
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  @change="onChange"
>
</n-data-table>
```

```js
const getFilters = () => {
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
      ]);
    }, 10000);
  });
};
const _columns = $this => {
  return [
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
      asyncFilterItems() {
        return getFilters().then(list => {
          return list;
        });
      },
      filter(value, record) {
        return record.address.indexOf(value) >= 0;
      }
    }
  ];
};

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
];
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
      return { total: this.data.length, limit: 5 };
    }
  },
  methods: {
    onChange({ filter, sorter, pagination }) {
      console.log(filter, sorter, pagination);
    }
  }
};
```
