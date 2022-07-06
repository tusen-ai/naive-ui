# Height debug

```html
<n-data-table
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :scroll-x="1800"
  :max-height="500"
  :min-height="300"
/>
```

```js
import { defineComponent, ref } from 'vue'

const columns = [
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
  }
]

export default defineComponent({
  setup () {
    return {
      data: [],
      columns,
      pagination: { pageSize: 10 },
      height: ref(200)
    }
  }
})
```
