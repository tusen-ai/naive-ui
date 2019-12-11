# Filter and sorter

```html
<n-button @click="sortName" style="margin-right:5px;">sort name</n-button>
<n-button @click="clearFilters" style="margin-right:5px;"
  >clear filters</n-button
>
<n-button @click="clearFiltersAndSorters">clear filters and sorters</n-button>

<n-advanced-table
  style="margin-top:10px;"
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  @on-change="onChange"
>
</n-advanced-table>
```

```js
const _columns = $this => {
  return [
    {
      title: "Name",
      key: "name",
      sortable: true,
      sorter(rowA, rowB) {
        return rowA.name.length - rowB.name.length;
      }
    },
    {
      title: "Age",
      key: "age",
      defaultSortOrder: "ascend",
      sortable: true,
      sorter(rowA, rowB) {
        return rowA.age - rowB.age;
      }
    },
    {
      title: "Address",
      key: "address",
      filterable: true,
      filterItems: [
        {
          label: "London",
          value: "London"
        },
        {
          label: "New York",
          value: "New York"
        }
      ],
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
    },
    sortName() {
      this.$refs.table.sort("name", "ascend");
    },
    clearFilters() {
      this.$refs.table.filter(null);
    },
    clearFiltersAndSorters() {
      this.$refs.table.filter(null);
      this.$refs.table.sort(null);
    }
  }
};
```
