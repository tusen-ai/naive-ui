# Batch rendering

As you can see, prefix, label, and suffix all have render functions.

```html
<n-tree
  block-line
  :data="data"
  :default-expanded-keys="defaultExpandedKeys"
  :render-prefix="renderPrefix"
  :render-label="renderLabel"
  :render-suffix="renderSuffix"
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
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
      level
    }
  })
}

function createLabel (level) {
  if (level === 4) return 'Out of Tao, One is born'
  if (level === 3) return 'Out of One, Two'
  if (level === 2) return 'Out of Two, Three'
  if (level === 1) return 'Out of Three, the created universe'
}

function renderPrefix ({ option }) {
  return h(
    NButton,
    { text: true, type: 'primary' },
    { default: () => `Prefix-${option.level}` }
  )
}

function renderLabel ({ option }) {
  return `${option.label} :)`
}

function renderSuffix ({ option }) {
  return h(
    NButton,
    { text: true, type: 'primary' },
    { default: () => `Suffix-${option.level}` }
  )
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41']),
      renderPrefix,
      renderLabel,
      renderSuffix
    }
  }
})
```
