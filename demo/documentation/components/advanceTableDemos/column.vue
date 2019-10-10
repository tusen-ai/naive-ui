<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Column
      <br>
      列描述数据对象，是 columns 中的一项
      <br>
      内容过长,表格下方有横向滚动条
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
      width: 100,
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
    name: 'title',
    desc: '列头显示文字',
    type: 'String',
    default: ``
  },
  {
    name: 'key',
    desc: '对应列内容的字段名',
    type: 'String',
    default: ``
  },
  {
    name: 'width',
    desc: '列宽',
    type: 'Number',
    default: ''
  },
  {
    name: 'align',
    desc: `对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐`,
    type: 'String',
    default: ``
  },
  {
    name: 'className',
    desc: `列的样式名称
    传入函数可以根据行数据进行判断返回相应的classname
    (params)=>{return 'classname'}
    -----
    传入字符串将会所有的都设置同样的classname
    `,
    type: 'Function | String',
    default: ``
  },
  {
    name: 'sortable',
    desc: '当前列是否排序,sortable===custom 触发on-change进行远程排序,sortable==true使用本地排序,',
    type: 'String, Boolean',
    default: `false`
  },
  {
    name: 'sorter',
    desc: `
    本地排序的自定义排序函数,若没有将使用默认的字符串比较排序
    example:
    // a,b为rowData
    (a, b) => {
          return a.age - b.age;
    },
    `,
    type: 'Function',
    default: ``
  },
  {
    name: 'ellipsis',
    desc: '文本不换行,超出部分显示省略号',
    type: 'Boolean',
    default: `false`
  },
  {
    name: 'render',
    desc: '自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row,_index,包含行数据,数据的索引',
    type: 'number | string',
    default: `auto`
  },
  {
    name: 'onFilter',
    desc: `过滤筛选 onFilter===custom 触发on-change进行远程排序,onFilter==function使用本地排序
    example:
    // value为选中的值,record为行数据
    (value, record) => {
          // value 为选中值, 请注意,value为了和过去版本兼容,无论单选或者多选都会返回一个数组,在未来的大版本更新中将会区分单选多选返回单值或数组
          switch (value[0]) {
            case 15:
              return record.age > 15;
            case 14:
              return record.age < 14;
          }
    }`,
    type: 'Function | String',
    default: ``
  },
  {
    name: 'filterItems',
    desc: `过滤的选项列表 与onFilter一起使用,否则无效
    example:
    [
      {
        label:'age 15',
        value: '15'
      },
      {
        label:'age 14',
        value: '14'
      }
    ]
    `,
    type: 'Array',
    default: ``
  },
  {
    name: 'filterMultiple',
    desc: `是否开启多选过滤`,
    type: 'Boolean',
    default: `false`
  },
  {
    name: 'asyncFilterItems',
    desc: `异步获取过滤的选项列表 与onFilter一起使用,否则无效,
    example:
    注意: 此函数需要返回如下格式:
    [
      {
        label:'age 15',
        value: '15'
      },
      {
        label:'age 14',
        value: '14'
      }
    ]

    asyncFilterItems() {
      return fetch('/filteritems')
    }
    `,
    type: 'async Function',
    default: ``
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
