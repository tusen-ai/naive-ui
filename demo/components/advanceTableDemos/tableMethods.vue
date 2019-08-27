<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Table Methods
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-advance-table
        :columns="columns"
        :data="data"
      />
      <!--EXAMPLE_END-->
    </div>
    <!-- <n-doc-source-block> -->
    <!--SOURCE-->
    <!-- </n-doc-source-block> -->
  </div>
</template>

<script>
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
      title: '参数',
      key: 'params',
      render (h, params) {
        const arr = params.row.params.map((item) => {
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
    name: 'setParams',
    desc: '可以在mounted里setParams设置初始的sort,page,filter,search等,此操作会触发on-change事件,请在on-change里进行数据更新',
    params: [
      {
        name: 'filterData',
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

  }
]
export default {
  components: {
  },
  data () {
    const columns = _columns3(this)

    return {
      columns,
      data
    }
  }
}
</script>
