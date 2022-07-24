# 自定义渲染列头

```html
<n-data-table :columns="columns" :data="data" :pagination="pagination" />
```

```js
import { defineComponent, h } from 'vue'
import { NTooltip, NGradientText } from 'naive-ui'

const renderTooltip = (trigger, content) => {
  return h(NTooltip, null, {
    trigger: () => trigger,
    default: () => content
  })
}

const createColumns = (instance) => {
  return [
    {
      key: 'name',
      title (column) {
        return renderTooltip(
          h(
            NGradientText,
            {
              size: 24,
              type: 'danger'
            },
            { default: () => 'Name' }
          ),
          'Tooltip Content'
        )
      }
    },
    {
      key: 'age',
      title (column) {
        return h(
          NGradientText,
          {
            size: '20',
            type: 'info'
          },
          { default: () => 'Age' }
        )
      }
    },
    {
      key: 'address',
      title (column) {
        return h(
          NGradientText,
          {
            size: '16',
            type: 'warning'
          },
          { default: () => 'Address' }
        )
      }
    }
  ]
}

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default defineComponent({
  setup () {
    return {
      data,
      columns: createColumns(this),
      pagination: {
        pageSize: 10
      }
    }
  }
})
```
