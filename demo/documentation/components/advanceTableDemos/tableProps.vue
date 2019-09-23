<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Table Props 内容过长,表格下方有横向滚动条
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
      title: '属性',
      key: 'name',
      width: 180

    },
    {
      title: '说明',
      key: 'desc',
      width: 500,
      render (h, params) {
        return <pre class="n-table-props-desc">
          {params.row.desc}
        </pre>
      }
    },
    {
      title: '类型',
      key: 'type',
      width: 200

    },
    {
      title: '默认值',
      key: 'default',
      width: 500,
      render (h, params) {
        return <pre class="n-table-props-desc">
          {params.row.default}
        </pre>
      }
    }
  ]
}
const data = [
  {
    name: 'columns',
    desc: '表格是否加载中',
    type: 'Boolean',
    default: `false`
  },
  {
    name: 'loading',
    desc: '最大高度,超出后会固定头部,并显示滚动条',
    type: 'number | string',
    default: `auto`
  },
  {
    name: 'data',
    desc: '显示的结构化数据',
    type: 'Array',
    default: '[]'
  },
  {
    name: 'row-class-name',
    desc: `行的css className
            当为Function时传入参数是
            - {row,_index} 行数据以及在源data数据中的索引
            - index行索引`,
    type: '[Array, String, Object, Function]',
    default: ``
  },
  {
    name: 'search',
    desc: `是否显示搜索,如果传入一个Object格式需要如下:
      example1: 本地搜索
      {
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
      --------
      example2: 远程搜索
       {
        // 如果你不传入search.column,那么搜索框左侧的搜索选项不会显示
        columns: [
          { label: 'Name',
            value: 'name' },
          { label: 'Age',
            value: 'age' }
        ],
        onSearch: 'custom', //触发on-change事件进行网络搜索
        placeholder: 'search in local data'
      }
    `,
    type: 'Object,Boolean',
    default: `false`
  },
  {
    name: 'pagination',
    desc: '分页功能',
    type: 'Object, Boolean',
    default: `
    example1: 远程分页触发on-change事件
        "pagination": {
          "total": 20,//items总数
          "limit": 10,//每页显示数量
          "custom": true
        },
    -----------
    example2: 本地分页
      "pagination": {
          "total": 20,
          "limit": 10,
        },
    `
  },
  {
    name: 'onChange',
    desc: '同event中的on-change,未来将会被废弃!',
    type: 'Function',
    default: `()=>{}`
  },
  {
    name: 'minHeight',
    desc: '最小高度',
    type: 'number | string',
    default: `unset`
  },
  {
    name: 'maxHeight',
    desc: '最大高度,超出后会固定头部,并显示滚动条',
    type: 'number | string',
    default: `auto`
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
<style>
.n-table-props-desc {
  white-space:pre-wrap;
}
</style>
