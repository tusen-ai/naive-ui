# Customize Key and Label Field

Various data would come from backend.

```html
<n-tree
  block-line
  :data="data"
  :default-expanded-keys="defaultExpandedKeys"
  key-field="whateverKey"
  label-field="whateverLabel"
  children-field="whateverChildren"
  selectable
/>
```

```js
import { defineComponent, ref } from 'vue'

function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array.apply(null, { length: 6 - level }).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      whateverLabel: createLabel(level),
      whateverKey: key,
      whateverChildren: createData(level - 1, key)
    }
  })
}

function createLabel (level) {
  if (level === 4) return 'Out of Tao, One is born'
  if (level === 3) return 'Out of One, Two'
  if (level === 2) return 'Out of Two, Three'
  if (level === 1) return 'Out of Three, the created universe'
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41'])
    }
  }
})
```
