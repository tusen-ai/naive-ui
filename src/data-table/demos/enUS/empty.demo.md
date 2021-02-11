# Empty

```html
<n-data-table :columns="columns" :data="data" />
```

```js
import { ref } from 'vue'

const createColumns = () => {
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
      width: '20%'
    },
    {
      title: 'Action',
      key: 'actions',
      width: '20%'
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
