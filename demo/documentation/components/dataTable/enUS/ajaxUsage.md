# Ajax

> filter,sorter,pagination should use `custom`

```html
<n-button @click="sortName" style="margin-right:5px;">sort name</n-button>
<n-button @click="clearFilters" style="margin-right:5px;"
  >clear filters</n-button
>
<n-button @click="clearFiltersAndSorters">clear filters and sorters</n-button>

<n-data-table
  style="margin-top:10px;"
  ref="table"
  :columns="columns"
  :data="data"
  :loading="loading"
  :pagination="pagination"
  @change="onChange"
>
</n-data-table>
```

```js
const _columns = $this => {
  return [
    {
      title: "Name",
      key: "name",
      sortable: true,
      sorter: "custom",
      render(h, params) {
        return (
          <span>
            {params.row.name.first} {params.row.name.last}
          </span>
        );
      }
    },
    {
      title: "Gender",
      key: "gender",
      filterable: true,
      filterItems: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
      ]
    },
    {
      title: "Email",
      key: "email"
    }
  ];
};

export default {
  data() {
    return {
      data: [],
      columns: _columns(this),
      loading: false,
      total: 0
    };
  },
  mounted() {
    this.getData().then(data => {
      this.data = data.results;
      this.total = 100;
    });
  },
  computed: {
    pagination() {
      return { total: this.total, limit: 5, custom: true };
    }
  },
  methods: {
    getData(params = {}) {
      this.loading = true;
      if (!params.results) {
        params.results = this.pagination.limit;
      }
      if (!params.page) {
        params.page = this.pagination.currentPage;
      }
      let url = "https://randomuser.me/api";
      let paramsArr = [];
      Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
          params[key].forEach(value => {
            paramsArr.push(`${key}[]=${value}`);
          });
        } else paramsArr.push(`${key}=${params[key]}`);
      });
      if (paramsArr.length) {
        url = url + "?" + paramsArr.join("&");
      }
      console.log("TCL: fetch -> url", url);

      return fetch(url)
        .then(res => res.json())
        .finally(() => {
          this.loading = false;
        });
    },
    onChange({ filter, sorter, pagination }) {
      let params = {
        page: pagination.currentPage
      };
      if (sorter) {
        Object.assign(params, {
          sortField: sorter.field,
          sortOrder: sorter.order
        });
      }
      if (filter) {
        Object.assign(params, {
          ...filter
        });
      }
      this.getData(params).then(data => {
        this.data = data.results;
      });
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
