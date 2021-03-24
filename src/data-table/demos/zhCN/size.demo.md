# 尺寸

```html
<n-space vertical :size="12">
  <n-data-table
    size="small"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
  <n-data-table
    size="large"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</n-space>
```

```js
import { h, defineComponent } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'

const createColumns = ({ sendMail }) => {
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
