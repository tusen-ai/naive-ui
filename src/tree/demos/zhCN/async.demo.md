# 异步加载

设定 `remote` 后，使用 `on-load` 回调来加载数据。异步加载时，所有 `isLeaf` 为 `false` 并且 `children` 不为数组的节点会被视为未加载的节点。

```html
<n-tree
  block-line
  checkable
  remote
  :data="data"
  :checked-keys="checkedKeys"
  :on-load="handleLoad"
  @update:checked-keys="handleCheckedKeysChange"
  :expanded-keys="expandedKeys"
  @update:expanded-keys="handleExpandedKeysChange"
/>
```

```js
function createData () {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}

function nextLabel (currentLabel) {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  if (currentLabel === '三生万物') return '道生一'
}

export default {
  data () {
    return {
      data: createData(),
      expandedKeys: [],
      checkedKeys: []
    }
  },
  methods: {
    handleExpandedKeysChange (expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    handleCheckedKeysChange (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    handleLoad (node) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          node.children = [
            {
              label: nextLabel(node.label),
              key: node.key + nextLabel(node.label),
              isLeaf: false
            }
          ]
          this.data = Array.from(this.data)
          resolve()
        }, 1000)
      })
    }
  }
}
```
