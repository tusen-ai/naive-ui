# 总结栏

使用 `summary` 属性渲染总结栏。

```html
<n-data-table :columns="columns" :data="data" :summary="summary" />
```

```js
import { defineComponent } from 'vue'

const createColumns = () => {
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
    }
  ]
}

const createData = () => [
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
      summary: (pageData) => {
        return {
          name: {
            value: pageData.reduce((prevValue, row) => prevValue + row.age, 0),
            colSpan: '3'
          }
        }
      },
      data: createData(),
      columns: createColumns()
    }
  }
})
```
