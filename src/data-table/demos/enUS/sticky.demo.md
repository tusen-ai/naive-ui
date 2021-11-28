# Sticky

Fix the table header to the top of the page. Scroll 'John Brown' out of the view and you'll know what I mean.

```html
<n-data-table :columns="columns" :data="data" sticky />
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
  },
  {
    key: 3,
    name: 'Taylor Red',
    age: 22,
    address: 'Nashville No. 1 Lake Park'
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
