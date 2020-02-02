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
const renderTooltip = (h, activator, content) => {
  const scopedSlots = {
    activator: () => activator,
    default: () => content
  }
  return h('n-tooltip', {
    props: {
      arrow: true
    },
    scopedSlots
  })
}

const createColumns = instance => {
  return [
    {
      key: 'name',
      title (h, column) {
        return renderTooltip(
          h,
          h('n-gradient-text', {
            props: {
              size: 24,
              type: 'danger'
            }
          }, 'Name'),
          'Tooltip Content'
        )
      }
    },
    {
      key: 'age',
      title (h, column) {
        return h('n-gradient-text', {
          props: {
            size: '20',
            type: 'info'
          }
        }, 'Age')
      }
    },
    {
      key: 'address',
      title (h, column) {
        return h(
          'n-gradient-text', {
          props: {
            size: '16',
            type: 'warning'
          }
        }, 'Address')
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
