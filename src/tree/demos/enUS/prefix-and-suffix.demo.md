# Prefix and suffix

Add some actions.

```html
<n-tree
  block-line
  :data="data"
  :default-expanded-keys="defaultExpandedKeys"
  :selectable="false"
/>
```

```js
import { h, defineComponent, ref } from 'vue'
import { NButton } from 'naive-ui'

function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array.apply(null, { length: 6 - level }).map((_, index) => {
    const key = '' + baseKey + level + index
    const label = createLabel(level)
    return {
      label,
      key,
      children: createData(level - 1, key),
      suffix: () =>
        h(
          NButton,
          { text: true, type: 'primary' },
          { default: () => 'Suffix' }
        ),
      prefix: () =>
        h(NButton, { text: true, type: 'primary' }, { default: () => 'Prefix' })
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
