# Best Practices

> filter,sorter,pagination should use `custom`

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
  :loading="loading"
  :pagination="pagination"
  :max-height="300"
  max-width="600px"
  @on-change="onChange"
>
</n-advanced-table>
```

```js
const toolTip = (h, activator, content) => {
  const scopedSlots = {
    activator: () => activator
  };
  return (
    <n-tooltip delay={100} maxWidth={200} arrow scopedSlots={scopedSlots}>
      {content}
    </n-tooltip>
  );
};

const _columns = $this => {
  return [
    {
      title: "User",
      key: "name",
      width: 150,
      fixed: "left",
      sortable: true,
      sorter: "custom",
      render(h, params) {
        return (
          <div class="user-base-info">
            <img src={params.row.picture.thumbnail} class="avatar" />
            <div
              title={params.row.name.first + " " + params.row.name.last}
              style="max-width:100px;"
              class="text-overflow"
            >
              {params.row.name.first} {params.row.name.last}
            </div>
          </div>
        );
      }
    },
    {
      title: "Gender",
      key: "gender",
      align: "center",
      width: 100,
      filterable: true,
      filterItems: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
      ]
    },
    {
      title: "Phone",
      key: "phone",
      width: 120
    },
    {
      title: "Address",
      key: "address",
      width: 150,
      render(h, params) {
        const loc = params.row.location;
        const address = `${loc.country} ${loc.state} ${loc.city} ${loc.street
          .name +
          " " +
          loc.street.number}`;
        return toolTip(
          h,
          <div style="max-width:130px;" class="text-overflow">
            {address}
          </div>,
          address
        );
      }
    },
    {
      title: "Email",
      key: "email",
      width: 150,
      render(h, params) {
        return (
          <a class="mail-link" href={"mailto:" + params.row.email}>
            {" "}
            {params.row.email}{" "}
          </a>
        );
      }
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right",
      render(h, params) {
        return <span>action</span>;
      }
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
      return {
        total: this.total,
        limit: 10,
        custom: true,
        showQuickJumper: true
      };
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

```css
/deep/ .user-base-info {
  display: flex;
  align-items: center;
}
/deep/ .avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
/deep/ .mail-link {
  color: blue;
}
/deep/ .text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
