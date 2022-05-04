# 弹性高度

如果你想设定表格的整体高度，你可以在设定好表格高度的情况下设定 `flex-height` 属性。

```html
<n-space vertical>
  <n-slider
    :min="200"
    :max="500"
    :step="100"
    v-model:value="height"
    style="max-width: 180px;"
  />
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :scroll-x="1800"
    :style="{ height: `${height}px` }"
    flex-height
  />
</n-space>
```

```js
import { h, defineComponent, ref } from 'vue'

const columns = [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left'
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    fixed: 'left'
  },
  {
    title: 'Row',
    key: 'row',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row1',
    key: 'row1',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row2',
    key: 'row2',
    render (row, index) {
      return h('span', ['row ', index])
    },
    width: 100,
    fixed: 'right'
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right'
  }
]

export default defineComponent({
  setup () {
    return {
      data: Array.apply(null, { length: 46 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      })),
      columns,
      pagination: { pageSize: 10 },
      height: ref(200)
    }
  }
})
```
