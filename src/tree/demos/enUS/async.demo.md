# Async Loading

After set `remote`, use `on-load` callback to load data. When loading async, all nodes with `isLeaf` set to `false` and `chilren`'s type is not `Array` will be reckon as unloaded nodes.

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
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
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
