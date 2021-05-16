# Huge Date

Set `virtual-scroll` to use virtual scroll. Note that you should set the height of the tree.

```html
<n-tree
  block-node
  :data="data"
  default-expand-all
  virtual-scroll
  style="height: 320px;"
/>
```

```js
function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array.apply(null, { length: 10 - level }).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level) {
  if (level === 4) return 'Out of Tao, One is born'
  if (level === 3) return 'Out of One, Two'
  if (level === 2) return 'Out of Two, Three'
  if (level === 1) return 'Out of Three, the created universe'
}

export default {
  setup () {
    return {
      data: createData()
    }
  }
}
```
