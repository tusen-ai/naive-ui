# 基础用法

```html
<n-data-table
  :columns="columns"
  :data="data"
  :pagination="pagination"
/>
```

```js
import { h, resolveComponent } from 'vue'

const createColumns = instance => {
  return [
    {
      title: 'Name111',
      key: 'name',
      width: '15%'
    },
    {
      title: 'Age',
      key: 'age',
      width: '10%'
    },
    {
      title: 'Address',
      key: 'address',
      width: '20%'
    },
    {
      title: 'Tags',
      key: 'tags',
      width: '20%',
      render (row) {
        const tags = row.tags.map(tagKey => {
          return h(resolveComponent('n-tag'), {
            style: {
              marginRight: '6px'
            },
            type: 'info'
          }, {
            default: () => tagKey 
          })
        })
        return tags
      }
    },
    {
      title: 'Action',
      key: 'actions',
      width: '20%',
      render (row) {
        return h(resolveComponent('n-button'), {
          size: 'small',
          onClick: () => instance.sendMail(row)
        }, { default: () => 'Send Email' })
      }
    }
  ]
}

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
  inject: ['message'],
  data() {
    return {
      data: data,
      columns: createColumns(this)
    }
  },
  computed: {
    pagination() {
      return { total: this.data.length, pageSize: 10 }
    }
  },
  methods: {
    sendMail(rowData) {
      this.message.info('send mail to ' + rowData.name)
    }
  }
}
```
