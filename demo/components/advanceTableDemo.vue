<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        AdvanceTable
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <!-- remote sort -->
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic use
        </div>
        <div class="n-doc-section__view">
          <n-advance-table
            :columns="columns0"
            :data="data"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-advance-table
  :columns="columns"
  :data="data"
/>
//
<script>
export default {
  data () {
    let d = new Array(20).fill(0)
    d = d.map((item, idx) => {
      return {
        name: 'xiaobai' + idx,
        age: 10 + Math.ceil(Math.random() * 10)
      }
    })
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
        },
        {
          title: 'Age',
          key: 'age',
          render: (h, params) => {
            return <b>{params.row.age}</b>
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
      ],
      data: d
    }
  },
  methods: {

  }
}
</script>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Fixed header
        </div>
        <div class="n-doc-section__view">
          <n-advance-table
            :columns="columns"
            :data="data"
            max-height="300px"
            :on-change="onChange"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-advance-table
  :columns="columns"
  :data="data"
  max-height="300px"
  :on-change="onChange"
/>
//
<script>
export default {
  mixins: [docCodeEditorMixin],
  data () {
    let d = new Array(20).fill(0)
    d = d.map((item, idx) => {
      return {
        name: 'xiaobai' + idx,
        age: 10 + Math.ceil(Math.random() * 10)
      }
    })
    console.log(d)
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          filterMultiple: false,
          filterItems: [{
            label: 'xiaobai1',
            value: 'xiaobai1'
          }],
          onFilter: 'custom'
        },
        {
          title: 'Age',
          key: 'age',
          sortable: true,
          filterMultiple: true, //多选 onFilter接受参数为数组
          filterItems: [{
            label: '14',
            value: 14
          }, {
            label: '15',
            value: 15
          }],
          onFilter: (value, record) => {
            return value.includes(record.age)
            // switch (value) {
            //   case 14:
            //     return record.age <= value
            //   case 15:
            //     return record.age >= value
            // }
          },
          render: (h, params) => {
            return <b>{params.row.age}</b>
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
      ],
      data: d
    }
  },
  methods: {
    handleClick (params) {
      alert('delete' + JSON.stringify(params))
    },
    onChange (...args) {
      console.log(args)
    }

  }
}
</script>
          </textarea>
        </div>
      </div>
      <!-- remote sort -->
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Remote sort
        </div>
        <div class="n-doc-section__view">
          <n-advance-table
            :columns="columns1"
            :data="data"
            max-height="300px"
            :on-change="onChange"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-advance-table
  :columns="columns"
  :data="data"
  max-height="300px"
  :on-change="onChange"
/>
//
<script>
export default {
  data () {
    let d = new Array(20).fill(0)
    d = d.map((item, idx) => {
      return {
        name: 'xiaobai' + idx,
        age: 10 + Math.ceil(Math.random() * 10)
      }
    })
    console.log(d)
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          filterMultiple: false,
          filterItems: [{
            label: 'xiaobai1',
            value: 'xiaobai1'
          }],
          onFilter: 'custom'
        },
        {
          title: 'Age',
          key: 'age',
          sortable: 'custom', // 远程sort 传入props 需要包含on-change事件
          filterMultiple: false, //多选 onFilter接受参数为数组
          filterItems: [{
            label: 'smaller than 14',
            value: 14
          }, {
            label: 'greater than 15',
            value: 15
          }],
          onFilter: (value, record) => {
            switch (value) {
              case 14:
                 return record.age <= value
              case 15:
                 return record.age >= value
             }
          },
          render: (h, params) => {
            return <b>{params.row.age}</b>
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
      ],
      data: d
    }
  },
  methods: {
    handleClick (params) {
      alert('delete' + JSON.stringify(params))
    },
    onChange (...args) {
      console.log(args)
    }

  }
}
</script>
          </textarea>
        </div>
      </div>

      <!-- 远程 filter -->
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Remote filter
        </div>
        <div class="n-doc-section__view">
          <n-advance-table
            :columns="columns1"
            :data="data"
            max-height="300px"
            :on-change="onChange"
          />
        </div>
        <div class="n-doc-section__source">
          <textarea><n-advance-table
  :columns="columns"
  :data="data"
  max-height="300px"
  :on-change="onChange"
/>
//
<script>
export default {
  data () {
    let d = new Array(20).fill(0)
    d = d.map((item, idx) => {
      return {
        name: 'xiaobai' + idx,
        age: 10 + Math.ceil(Math.random() * 10)
      }
    })
    console.log(d)
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          filterMultiple: false,
          filterItems: [{
            label: 'xiaobai1',
            value: 'xiaobai1'
          }],
          onFilter: 'custom' //远程filter 传入props 需要包含on-change事件
        },
        {
          title: 'Age',
          key: 'age',
          sortable: 'custom', // 远程sort 传入props 需要包含on-change事件
          filterMultiple: false, //多选 onFilter接受参数为数组
          filterItems: [{
            label: 'smaller than 14',
            value: 14
          }, {
            label: 'greater than 15',
            value: 15
          }],
          onFilter: (value, record) => {
            switch (value) {
              case 14:
                 return record.age <= value
              case 15:
                 return record.age >= value
             }
          },
          render: (h, params) => {
            return <b>{params.row.age}</b>
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
      ],
      data: d
    }
  },
  methods: {
    handleClick (params) {
      alert('delete' + JSON.stringify(params))
    },
    onChange (...args) {
      console.log(args)
    }

  }
}
</script>
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    let d = new Array(20).fill(0)
    d = d.map((item, idx) => {
      return {
        name: 'xiaobai' + idx,
        age: 10 + Math.ceil(Math.random() * 10)
      }
    })
    console.log(d)
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          filterMultiple: false,
          filterItems: [{
            label: 'xiaobai1',
            value: 'xiaobai1'
          }],
          onFilter: 'custom'
        },
        {
          title: 'Age',
          key: 'age',
          sortable: true,
          filterMultiple: true,
          filterItems: [{
            label: '14',
            value: 14
          }, {
            label: '15',
            value: 15
          }],
          onFilter: (value, record) => {
            return value.includes(record.age)
            // switch (value) {
            //   case 14:
            //     return record.age <= value
            //   case 15:
            //     return record.age >= value
            // }
          },
          render: (h, params) => {
            return <b>{params.row.age}</b>
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
      ],
      data: d,
      columns0: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age',
          render: (h, params) => {
            return <b>{params.row.age}</b>
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
        }],
      columns1: [
        {
          title: 'Name',
          key: 'name',
          filterMultiple: false,
          filterItems: [{
            label: 'xiaobai1',
            value: 'xiaobai1'
          }],
          onFilter: 'custom'
        },
        {
          title: 'Age',
          key: 'age',
          sortable: 'custom',
          filterMultiple: false, // 多选 onFilter接受参数为数组
          filterItems: [{
            label: 'smaller than 14',
            value: 14
          }, {
            label: 'greater than 15',
            value: 15
          }],
          onFilter: (value, record) => {
            switch (value) {
              case 14:
                return record.age <= value
              case 15:
                return record.age >= value
            }
          },
          render: (h, params) => {
            return <b>{params.row.age}</b>
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
  },
  methods: {
    handleClick (params) {
      alert('delete' + JSON.stringify(params))
    },
    onChange ({ filter, sorter, pagination }) {
      alert('remote sort' + JSON.stringify({ sorter, filter }))
    }

  }
}
</script>
