# Custom Render Column Header

```html
<n-data-table
  ref='table'
  :columns='columns'
  :data='data'
  :pagination='pagination'
/>
```

```js
import { h, resolveComponent } from 'vue'

const renderTooltip = (trigger, content) => {
  return h(resolveComponent('n-tooltip'), {
    showArrow: true
  }, {
    trigger: () => trigger,
    default: () => content
  })
}

const createColumns = instance => {
  return [
    {
      key: 'name',
      title (column) {
        return renderTooltip(
          h(resolveComponent('n-gradient-text'), {
            size: 24,
            type: 'danger'
          }, { default: () => 'Name' }),
          'Tooltip Content'
        )
      }
    },
    {
      key: 'age',
      title (column) {
        return h(resolveComponent('n-gradient-text'), {
          size: '20',
          type: 'info'
        }, { default: () => 'Age' })
      }
    },
    {
      key: 'address',
      title (column) {
        return h(resolveComponent('n-gradient-text'), {
          size: '16',
          type: 'warning'
        }, { default: () => 'Address' })
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

export default {
  data () {
    return {
      data: data,
      columns: createColumns(this),
      pagination: {
        pageSize: 10
      }
    }
  }
}
```
