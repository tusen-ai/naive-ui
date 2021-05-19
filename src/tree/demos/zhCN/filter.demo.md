# 搜索

树接受 `pattern` 和 `filter` 来完成搜索。

```html
<n-space vertical :size="12">
  <n-input v-model:value="pattern" placeholder="搜索" />
  <n-tree :pattern="pattern" :data="data" block-line />
</n-space>
```

```js
function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array.apply(null, { length: 2 }).map((_, index) => {
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
      pattern: ''
    }
  }
}
```
