# Custom Selection Menu

Set `options` on a selection type column to create selection dropdown near header checkbox.

```html
<n-p>
  You have selected {{ checkedRowKeys.length }} row{{ checkedRowKeys.length < 2
  ? '': 's'}}.
</n-p>

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
              label: 'Select first 2 rows',
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
