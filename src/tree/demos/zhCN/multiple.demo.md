# 多选节点

设置 `multiple` 来允许多选节点。

```html
<n-tree multiple block-line :data="data" />
<n-divider />
<n-tree multiple block-line :data="data" v-model:selected-keys="value" />
```

```js
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

export default {
  data () {
    return {
      data: createData(),
      value: []
    }
  }
}
```
