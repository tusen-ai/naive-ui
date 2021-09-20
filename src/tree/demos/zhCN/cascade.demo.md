# 级联选择

设定 `cascade` 为 false 进行非级联选择。

```html
<n-tree
  block-line
  :cascade="false"
  checkable
  :data="data"
  :default-expanded-keys="defaultExpandedKeys"
  @update:checked-keys="updateCheckedKeys"
/>
```

```js
import { defineComponent, ref } from 'vue'

function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array.apply(null, { length: 6 - level }).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level) {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ref([]),
      updateCheckedKeys: (v) => {
        console.log('updateCheckedKeys', v)
      }
    }
  }
})
```
