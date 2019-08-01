<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Scrollbar
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); width: 800px; height: 500px;">
            666
          </div>
        </n-scrollbar>
      </div>
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); width: 400px; height: 500px;">
            666
          </div>
        </n-scrollbar>
      </div>
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); width: 800px; height: 300px;">
            666
          </div>
        </n-scrollbar>
      </div>
      <div style="width: 400px; height: 300px;">
        <n-scrollbar>
          <div style="background: linear-gradient(red, blue); height: 300px;">
            <div style="background: yellow; width: 100%; color: black;">
              666
            </div>
          </div>
        </n-scrollbar>
      </div>
      <div style="width: 400px;">
        <n-scrollbar>
          <n-advance-table
            :columns="columns"
            :data="data"
            max-height="300px"
            :on-change="onChange"
          />
        </n-scrollbar>
      </div>
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">Inspect some value here</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

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
          sortable: true,
          order: 1, // 默认升序
          sorter: (a, b) => {
            // soter 方法替换默认的sorter函数
            return a.age - b.age
          },
          filterMultiple: true, // 多选 onFilter接受参数为数组
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
