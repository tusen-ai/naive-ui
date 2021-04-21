# 自定义选择项菜单

在 `type='selection'` 的列设定 `options` 来在头部勾选框旁边创建下拉菜单。

```html
<n-p>你选中了 {{ checkedRowKeys.length }} 行。</n-p>

<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :pagination="pagination"
  v-model:checked-row-keys="checkedRowKeys"
/>
```

```js
import { defineComponent, ref } from 'vue'

const data = Array.apply(null, { length: 46 }).map((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
  key: index
}))

export default defineComponent({
  setup () {
    const checkedRowKeysRef = ref([])
    return {
      checkedRowKeys: checkedRowKeysRef,
      data,
      pagination: {
        pageSize: 6
      },
      columns: [
        {
          type: 'selection',
          options: [
            'all',
            'none',
            {
              label: '选中前 2 行',
              key: 'f2',
              onSelect: (pageData) => {
                checkedRowKeysRef.value = pageData
                  .map((row) => row.key)
                  .slice(0, 2)
              }
            }
          ],
          disabled (row, index) {
            return row.name === 'Edward King 3'
          }
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
  }
})
```
