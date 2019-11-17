<!--
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-23 15:59:41
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-11-07 13:52:07
 -->

# Senior Usage

```html
<n-advance-table
  ref="table"
  :loading="loading"
  :columns="columns"
  :data="data"
  max-height="300px"
  :search="search"
  :pagination="{total:data.length,limit:10,custom:true}"
  @on-change="onChange"
  @on-filter-change="onFilterChange"
  max-width="480px"
>
  <div slot="table-operation-batch-left">
    <n-button size="small" @click="clear">
      clear all filters
    </n-button>
  </div>
</n-advance-table>
<h1>Network params</h1>
<pre>{{ query }}</pre>
```

```js
const items = [
  {
    label: "age 15 asdsadsadsadsad",
    value: 15
  },
  {
    label: "age 14",
    value: 14
  },
  {
    label: "age 13",
    value: 13
  },
  {
    label: "age 12",
    value: 12
  },
  {
    label: "age 11",
    value: 11
  }
];
const sex = [
  {
    label: "male",
    value: "male"
  },
  {
    label: "female",
    value: "female"
  }
];
const _columns3 = $this => {
  return [
    {
      type: "selection",
      fixed: "left"
    },
    {
      title: "Name",
      key: "name",
      sortable: "custom",
      onFilter: (value, record) => {
        return value.includes(record.name + "");
      },
      width: 150,
      fixed: "left"
    },
    {
      title: "Age",
      key: "age",
      width: 100,

      sortable: true,
      sorter(a, b) {
        return a.age - b.age;
      },
      filterMultiple: true,
      asyncFilterItems() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // 模拟概率发生错误
            Math.random() > 0.6
              ? resolve(items)
              : reject(new Error("network error"));
          }, 1000);
        });
      },
      onFilter: "custom",
      render: (h, params) => {
        return <b>{params.row.age}</b>;
      }
    },
    {
      title: "Sex",
      key: "sex",
      width: 100,
      onFilter: (values, record) => {
        return values.includes(record.sex);
      },
      filterMultiple: true,
      asyncFilterItems() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.6
              ? resolve(sex)
              : reject(new Error("network error"));
          }, 1000);
        });
      }
    },
    {
      title: "#",
      width: 150,
      fixed: "right",
      render: (h, params) => {
        return (
          <n-button
            style="margin:0;"
            size="small"
            onClick={() => this.handleClick(params)}
          >
            delete
          </n-button>
        );
      }
    }
  ];
};
export default {
  components: {},
  data() {
    const columns = _columns3(this);
    return {
      loading: false,
      data: [],
      query: {},
      columns,
      search: {
        columns: [
          { label: "Name", value: "name" },
          { label: "Age", value: "age" }
        ],
        onSearch: "custom",
        placeholder: "search from net"
      }
    };
  },
  mounted() {
    this.$refs.table.setParams({
      filter: { age: [15] },
      sorter: { key: "name", type: -1 },
      searcher: { key: "name", value: "xiaobai" }
    });
  },
  methods: {
    getData(args) {
      this.loading = true;
      setTimeout(() => {
        let d = new Array(20).fill(0);
        d = d.map((item, idx) => {
          return {
            name: "xiaobai213213132123213111121" + idx,
            age: Math.ceil(Math.random() * 20),
            sex: Math.random() > 0.5 ? "male" : "female"
          };
        });
        this.data = d;
        this.loading = false;
      }, 3000);
    },
    onChange(args) {
      console.log("reomte change");
      this.query = args;
      console.log("TCL: onChange -> args", args);
      /**
       * "filter": {
          "age": {
            "value": [
              15
            ]
          }
        },
        "sorter": {
          "sortable": "custom",
          "key": "age",
          "type": -1,
          "column": {
            "title": "Age",
            "key": "age",
            "sortable": "custom",
            "onFilter": "custom"
          },
          "i": 1
        },
        "pagination": {
          "currentPage": 1,
          "total": 20,
          "limit": 10,
          "custom": true
        },
        "search": {
          "key": "name",
          "word": "xiaobai"
        }
      }
       */
      this.getData(args);
    },
    onFilterChange(data) {
      console.log("TCL: onFilterChange -> data", data);
    },
    clear() {
      // 清除所有的Filter选项,会触发onchange事件
      this.$refs.table.setParams({});
      this.$NMessage.info("clear all filters", { duration: 5000 });
    }
  }
};
```
