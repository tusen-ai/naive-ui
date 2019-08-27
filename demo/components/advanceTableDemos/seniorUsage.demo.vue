<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      高级用法
      <br>
      设置初始值,过滤选项异步加载(单选/多选,包含加载错误处理),清除所有筛选条件,分页,loading动画
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-advance-table
        ref="table"
        :loading="loading"
        :columns="columns"
        :data="data"
        max-height="300px"
        :search="search"
        :pagination="{total:data.length,limit:10,custom:true}"
        @on-change="onChange"
      >
        <div slot="table-operation-batch-left">
          <n-button
            size="small"
            @click="clear"
          >
            clear all filters
          </n-button>
        </div>
      </n-advance-table>
      <h1>Network params</h1>
      <pre>{{ query }}</pre>
      <!--EXAMPLE_END-->
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
const items = [
  {
    label: 'age 15 asdsadsadsadsad',
    value: 15
  },
  {
    label: 'age 14',
    value: 14
  },
  {
    label: 'age 13',
    value: 13
  },
  {
    label: 'age 12',
    value: 12
  },
  {
    label: 'age 11',
    value: 11
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
const _columns3 = ($this) => {
  return [
    {
      title: 'Name',
      key: 'name',
      sortable: 'custom',
      onFilter: (value, record) => {
        return value.includes(record.name + '')
      }
    },
    {
      title: 'Age',
      key: 'age',
      sortable: true,
      sorter (a, b) {
        return a.age - b.age
      },
      // filterMultiple: true,
      asynsFilterItems () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // 模拟概率发生错误
            Math.random() > 0.6 ? resolve(items) : reject(new Error('network error'))
          }, 1000)
        })
      },
      onFilter: 'custom',
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
      asynsFilterItems () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.6 ? resolve(sex) : reject(new Error('network error'))
          }, 1000)
        })
      }
    },
    {
      title: '#',
      render: (h, params) => {
        return (
          <n-button
            style="margin:0;"
            size="small"
            onClick={() => this.handleClick(params)}
          >
                delete
          </n-button>
        )
      }
    }
  ]
}
export default {
  components: {
  },
  data () {
    const columns = _columns3(this)
    return {
      loading: false,
      data: [],
      query: {},
      columns,
      search: {
        columns: [
          { label: 'Name',
            value: 'name' },
          { label: 'Age',
            value: 'age' }
        ],
        onSearch: 'custom',
        placeholder: 'search from net'
      }
    }
  },
  mounted () {
    this.$refs.table.setParams({ filter: { age: [15] }, sorter: { key: 'age', type: -1 }, searcher: { key: 'name', value: 'xiaobai' } })
  },
  methods: {
    getData (args) {
      this.loading = true
      console.log('TCL: getData -> args', args)
      setTimeout(() => {
        let d = new Array(20).fill(0)
        d = d.map((item, idx) => {
          return {
            name: 'xiaobai213213132123213111121' + idx,
            age: Math.ceil((Math.random() * 20)),
            sex: Math.random() > 0.5 ? 'male' : 'female'
          }
        })
        this.data = d
        this.loading = false
      }, 3000)
    },
    onChange (args) {
      console.log('TCL: onChange -> args', args)
      this.query = args
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
      this.getData(args)
    },
    clear () {
      // 清除所有的Filter选项,会触发onchange事件
      this.$refs.table.setParams({})
      this.$NMessage.info('clear all filters', { duration: 5000 })
    }
  }
}
</script>
