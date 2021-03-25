# Merge Cell

Set colspan and rowspan by setting `colSpan` and `rowSpan` of column object. Set colspan in header by setting `titleColSpan` of column object.

```html
<n-data-table
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :single-line="false"
/>
```

```js
import { h, defineComponent } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'

const createColumns = ({ sendMail }) => {
  return [
    {
      title: 'Name',
      key: 'name',
      width: '15%',
      rowSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1),
      colSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1)
    },
    {
      title: 'Age',
      key: 'age',
      width: '10%'
    },
    {
      title: 'Address',
      key: 'address',
      width: '20%',
      colSpan: (rowData, rowIndex) => (rowIndex === 2 ? 2 : 1)
    },
    {
      title: 'Tags',
      key: 'tags',
      width: '20%',
      render (row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
      }
    },
    {
      title: 'Action',
      key: 'actions',
      width: '20%',
      rowSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1),
      render (row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          { default: () => 'Send Email' }
        )
      }
    }
  ]
}

const createData = () => [
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

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      data: createData(),
      columns: createColumns({
        sendMail (rowData) {
          message.info('send mail to ' + rowData.name)
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
```
