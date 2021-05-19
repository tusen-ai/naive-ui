# 空表格

```html
<n-data-table :columns="columns" :data="data" />
```

```js
import { ref } from 'vue'

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
    },
    {
      title: 'Tags',
      key: 'tags'
    },
    {
      title: 'Action',
      key: 'actions'
    }
  ]
}

export default {
  setup () {
    const data = ref([])
    return {
      data,
      columns: createColumns()
    }
  }
}
```
