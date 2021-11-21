# 条纹

使用 `striped` 属性渲染条纹，使得表格明暗交替。

```html
<n-data-table :columns="columns" :data="data" striped />
```

```js
import { defineComponent } from 'vue'

const createColumns = () => {
  return [
    {
      type: 'selection'
    },
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
      data: createData(),
      columns: createColumns()
    }
  }
})
```
