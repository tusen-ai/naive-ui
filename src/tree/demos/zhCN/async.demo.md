# 异步加载

设定 `remote` 后，使用 `on-load` 回调来加载数据。异步加载时，所有 `isLeaf` 为 `false` 并且 `children` 不为数组的节点会被视为未加载的节点。

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
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  if (currentLabel === '三生万物') return '道生一'
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
          this.data = Array.from(this.data)
          resolve()
        }, 1000)
      })
    }
  }
}
```
