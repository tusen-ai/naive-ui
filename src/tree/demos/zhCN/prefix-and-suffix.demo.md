# 前缀与后缀

放一些操作。

```html
<n-tree
  block-line
  :data="data"
  :default-expanded-keys="defaultExpandedKeys"
  :selectable="false"
/>
```

```js
import { h, defineComponent } from 'vue'
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
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ['40', '41']
    }
  }
})
```
