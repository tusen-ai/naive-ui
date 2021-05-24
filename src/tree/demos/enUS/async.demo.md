# Async Loading

After set `remote`, use `on-load` callback to load data. When loading async, all nodes with `isLeaf` set to `false` and `chilren`'s type is not `Array` will be reckon as unloaded nodes.

```html
<n-tree
  block-line
  checkable
  remote
  draggable
  :data="data"
  :checked-keys="checkedKeys"
  :on-load="handleLoad"
  @drop="handleDrop"
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

function findSiblingsAndIndex (node, nodes) {
  if (!nodes) return [null, null]
  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i]
    if (siblingNode.key === node.key) return [nodes, i]
    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children)
    if (siblings) return [siblings, index]
  }
  return [null, null]
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
    handleDrop ({ node, dragNode, dropPosition }) {
      const data = this.data
      const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
        dragNode,
        data
      )
      dragNodeSiblings.splice(dragNodeIndex, 1)
      if (dropPosition === 'inside') {
        if (node.children) {
          node.children.unshift(dragNode)
        } else {
          node.children = [dragNode]
        }
      } else if (dropPosition === 'before') {
        const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, data)
        nodeSiblings.splice(nodeIndex, 0, dragNode)
      } else if (dropPosition === 'after') {
        const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, data)
        nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
      }
      this.data = Array.from(data)
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
          resolve()
        }, 1000)
      })
    }
  }
}
```
