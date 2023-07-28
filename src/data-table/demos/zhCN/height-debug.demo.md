# Height debug

```html
set max-height：<n-switch v-model:value="setMaxHeightRef" /> set
min-height：<n-switch v-model:value="setMinHeightRef" />
<n-data-table
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :scroll-x="1800"
  :max-height="setMaxHeightRef ? 500 : undefined"
  :min-height="setMinHeightRef ? 300 : undefined"
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
      setMaxHeightRef: ref(false),
      setMinHeightRef: ref(false)
    }
  }
})
```
