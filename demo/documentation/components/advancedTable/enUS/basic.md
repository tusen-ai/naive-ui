# Basic

```html
<n-advance-table
  ref="table"
  :row-class-name="computeRowcls"
  :columns="columns"
  :data="data"
  max-height="300px"
  :search="search"
  :pagination="{total:data.length,limit:10}"
  @on-change="onChange"
  @on-selected-change="onSelectedChange"
>
  <div slot="table-operation-batch-left" style="padding-left:27px;">
    <n-icon
      v-show="selectedRow.length"
      color="rgba(255,255,255,.7)"
      type="md-trash"
      size="24"
      title="delete all"
      style="cursor:pointer;"
      @click="batchDelete"
    />
    <n-button
      v-show="selectedRow.length"
      color="rgba(255,255,255,.7)"
      size="small"
      @click="clearSelect"
    >
      clear select
    </n-button>
  </div>
</n-advance-table>
```

```js
const items = [
  {
    label: 'greater than 15',
    value: 15
  },
  {
    label: 'less then 14',
    value: 14
  }
]
const sex = [
  {
    label: 'male',
    value: 'male'
  },
  {
    label: 'female',
    value: 'female'
  }
]
const _columns3 = $this => {
  return [
    {
      type: 'selection',
      disabled(params, index) {
        return params.row.age < 8
      }
      // fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name',
      sortable: true,
      width: 300,
      renderHeader(h, column) {
        return <n-tag>{column.title}</n-tag>
      }
    },
    {
      title: 'Age',
      key: 'age',
      sortable: true,
      sorter(a, b) {
        return a.age - b.age
      },
      // filterMultiple: true,
      filterItems: items,
      onFilter: (value, record) => {
        // value 为选中值, 请注意,value为了和过去版本兼容,无论单选或者多选都会返回一个数组,在未来的大版本更新中将会区分单选多选返回单值或数组
        switch (value[0]) {
          case 15:
            return record.age > 15
          case 14:
            return record.age < 14
        }
      },
      render: (h, params) => {
        return <b>{params.row.age}</b>
      }
    },
    {
      title: 'Sex',
      key: 'sex',
      onFilter: (values, record) => {
        return values.includes(record.sex)
      },
      filterMultiple: true,
      asyncFilterItems() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.6
              ? resolve(sex)
              : reject(new Error('network error'))
          }, 1000)
        })
      }
    },
    {
      title: '#',
      fixed: 'right',
      width: 200,
      render: (h, params) => {
        return (
          <n-button
            style="margin:0;"
            size="small"
            onClick={() => $this.handleDelete(params)}
          >
            delete
          </n-button>
        )
      }
    }
  ]
}
export default {
  components: {},
  data() {
    const columns = _columns3(this)

    return {
      selectedRow: [],
      columns,
      data: [],
      query: {},
      search: {
        // 如果你不传入search.column,那么搜索框左侧的搜索选项不会显示
        columns: [
          { label: 'Name', value: 'name' },
          { label: 'Age', value: 'age' }
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
  },
  mounted() {
    this.data = this.getData()
    // data一定要先有值才可以再selectRow
    this.$refs.table.selectRow([1, 2, 5])
    // this.$refs.table.selectRow('all') // 可以全选当前展示数据
  },
  methods: {
    clearSelect() {
      this.$refs.table.clearSelect()
    },
    batchDelete() {
      this.selectedRow.forEach(item => {
        let index = item._index
        this.data[index] = null
      })
      this.data = this.data.filter(item => item !== null)
    },
    computeRowcls(params) {
      if (params.row.age > 15) {
        return 'age-too-old'
      }
      return ''
    },
    handleDelete(params) {
      let index = params._index
      this.data.splice(index, 1)
      this.$NMessage.success('Delete successfully,', { duration: 2000 })
      this.$NMessage.warning('Data change,selected will be clear!', {
        duration: 4000
      })
    },
    getData(args) {
      let d = new Array(20).fill(0)
      d = d.map((item, idx) => {
        return {
          name: 'xiaobai' + idx,
          age: Math.ceil(Math.random() * 20),
          sex: Math.random() > 0.5 ? 'male' : 'female'
        }
      })
      return d
    },
    onSelectedChange(selectedRow) {
      console.log(selectedRow)
      this.selectedRow = selectedRow
    },
    onChange(args) {
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
    },
    clear() {
      // 清除所有的Filter选项,会触发onchange事件
      this.$refs.table.setParams({})
      this.$NMessage.info('clear all filters', { duration: 5000 })
    }
  }
}
```

```css
.age-too-old {
  color: rgba(255, 255, 255, 0.3);
}
```
