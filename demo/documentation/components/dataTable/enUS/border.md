# Unbordered & Single Line

```html
<n-data-table
  :bordered="false"
  :columns="columns"
  :data="data"
  :pagination="pagination"
/>
<n-data-table
  :bordered="false"
  :single-line="false"
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
      width: '20%',
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
