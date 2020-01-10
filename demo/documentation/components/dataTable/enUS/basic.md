# Basic Usage

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
/>
```

```js
const createColumns = instance => {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      render (h, row) {
        const tags = row.tags.map(tagKey => {
          return (
            h('n-tag', {
              staticStyle: {
                marginRight: '6px'
              },
              props: {
                type: 'info'
              }
            }, [ tagKey ])
          )
        })
        return tags
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render (h, row) {
        return h('n-button', {
          props: {
            size: 'small'
          },
          on: {
            click: () => instance.sendMail(row)
          }
        }, [ 'Send Email' ])
      }
    }
  ]
}

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
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
      this.$NMessage.info('send mail to ' + rowData.name)
    }
  }
}
```
