# Filter and sorter

```html
<n-button @click="sortName" style="margin-right:5px;">sort name</n-button>
<n-button @click="clearFilters" style="margin-right:5px;"
  >clear filters</n-button
>
<n-button @click="clearFiltersAndSorters" style="margin-right:5px;"
  >clear filters and sorters</n-button
>

<n-button @click="tryRoute">try set default by router query</n-button>

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
const _columns = $this => {
  const query = $this.$route.query;
  const orderKey = query.orderKey;
  const order = query.order;
  const filter = query.filter;
  const filterKey = query.filterKey;

  const columns = [
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
      sortable: true,
      sorter(rowA, rowB) {
        return rowA.age - rowB.age;
      }
    },
    {
      title: "Address",
      key: "address",
      filterable: true,
      filterMultiple: true,
      defaultFilter: ["London", "New York"],
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
  // set default order or filter
  columns.forEach(column => {
    if (column.key === orderKey) {
      column.defaultSortOrder = order;
    }
    if (column.key === filterKey) {
      column.defaultFilter = filter;
    }
  });
  console.log("TCL: columns", columns);
  return columns;
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
  watch: {},
  data() {
    console.log("route", this.$route);
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
      this.$refs.table.sort("name", "ascend", true);
    },
    clearFilters() {
      this.$refs.table.filter(null, true);
    },
    clearFiltersAndSorters() {
      this.$refs.table.filter(null, true);
      this.$refs.table.sort(null, true);
    },
    tryRoute() {
      this.$router.push({
        path: this.$route.path,
        hash: "#filter-and-sorter",
        query: {
          orderKey: "age",
          order: "descend",
          filterKey: "address",
          filter: "London"
        }
      });
      this.columns = _columns(this);
    }
  }
};
```
