# Event
```html
<n-advance-table
  :columns="columns"
  :data="data"
/>
```
```js
const _columns3 = ($this) => {
  return [
    {
      title: '名称',
      key: 'name'
    },
    {
      title: '说明',
      key: 'desc'
    },
    {
      title: '返回值',
      key: 'returns',
      render (h, params) {
        const arr = params.row.returns.map((item) => {
          return <li>{item.name} <pre>{item.desc}</pre></li>
        })
        return (
          <ul>
            {arr}
          </ul>
        )
      }
    }
  ]
}
const data = [
  {
    name: 'on-change',
    desc: '远程事件触发(排序,搜索,分页,过滤等 custom=true的条件下),可在这里调用获取data数据,改变data',
    returns: [{
      name: 'filtersData',
      desc: ` 
      example:
      {
        "filter": {
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
      }`
    }]
  },
  {
    name: 'on-page-change',
    desc: '页码发生改变触发',
    returns: [{
      name: 'paginationer',
      desc: `
        {
          "currentPage": ,
          "total": ,
          "limit": ,
          "custom": 
        },`
    }]
  },
  {
    name: 'on-filter-change',
    desc: '过滤数据发生改变触发',
    returns: [{
      name: 'filter',
      desc: `
      example: 
      {
        "age": {
          "value": [
            15,14
          ]
        }
      }`
    }]

  },
  {
    name: 'on-sort-change',
    desc: '排序数据发生改变触发',
    returns: [{
      name: 'sorter',
      desc: `
      example:
      {
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
      }
      `
    }]

  }
]
export default {
  components: {
  },
  data () {
    const columns = _columns3(this)

    return {
      columns,
      data,
      query: {},
      search: {
        // 如果你不传入search.column,那么搜索框左侧的搜索选项不会显示
        columns: [
          { label: 'Name',
            value: 'name' },
          { label: 'Age',
            value: 'age' }
        ],
        onSearch: (key, word, record) => {
          switch (key) {
            case 'age':
              return record['age'] === +word
            case 'name':
              return record['name'].includes(word)
          }
        },
        placeholder: 'search in local data'
      }
    }
  }
}
```