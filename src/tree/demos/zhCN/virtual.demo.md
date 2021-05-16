# 大量数据

设定 `virtual-scroll` 使用虚拟滚动，注意要设定好树的高度。

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
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
}

export default {
  setup () {
    return {
      data: createData()
    }
  }
}
```
