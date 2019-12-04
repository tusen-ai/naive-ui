# Methods

```html
<n-advance-table :columns="columns" :data="data" />
```

```js
const _columns3 = $this => {
  return [
    {
      title: "名称",
      key: "name"
    },
    {
      title: "说明",
      key: "desc"
    },
    {
      title: "参数",
      key: "params",
      render(h, params) {
        const arr = params.row.params.map(item => {
          return (
            <li>
              {item.name} <pre>{item.desc}</pre>
            </li>
          );
        });
        return <ul>{arr}</ul>;
      }
    }
  ];
};
const data = [
  {
    name: "setParams",
    desc:
      "可以在mounted里setParams设置初始的sort,page,filter,search等,此操作会触发on-change事件,请在on-change里进行数据更新",
    params: [
      {
        name: "filterData",
        desc: `
          {
           filter: { age: [15] }  or null, 
           sorter: { key: 'age', type: -1 }  or null, 
           searcher: { key: 'name', value: 'xiaobai' }  or null,
           page: 2 or null
          }
          `
      }
    ]
  },
  {
    name: "toggleRowSelection",
    desc:
      "可以在mounted里selectRow来进行选中某一行,当为字符串all时,选中当前显示所有行,当为数组时,选中行号-1的行(注意data数据要已经存在)",
    params: [
      {
        name: "rowIndexs Array, selected = true|false",
        desc: `
            [0,1,2]
          `
      }
    ]
  }
];
export default {
  components: {},
  data() {
    const columns = _columns3(this);

    return {
      columns,
      data
    };
  }
};
```
