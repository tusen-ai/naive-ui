# Async Loading

After set `remote`, use `on-load` callback to load data. When loading async, all nodes with `isLeaf` set to `false` and `chilren`'s type is not `Array` will be reckon as unloaded nodes.

```html
<n-tree
  block-node
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
function createData() {
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

function nextLabel(currentLabel) {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three')
    return 'Out of Three, the created universe'
  if (currentLabel === 'Out of Three, the created universe')
    return 'Out of Tao, One is born'
}

function dropIsValid({ dragNode, node }) {
  /** drop on itselft */
  if (dragNode.key === node.key) return false
  /** node is not loaded */
  if (node.isLeaf === false && !node.children) return false
  /** shouldn't drop parent to its child */
  const childKeys = []
  const dropNodeInside = (children) => {
    if (!children) return false
    return children.reduce((result, child) => {
      return result || child.key === node.key || dropNodeInside(child.children)
    }, false)
  }
  console.log('dropIsValid', !dropNodeInside(dragNode.children))
  return !dropNodeInside(dragNode.children)
}

function findSiblingsAndIndex(node, nodes) {
  if (!nodes) return [null, null]
  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i]
    if (siblingNode.key === node.key) return [nodes, i]
    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children)
    if (siblings) return [siblings, index]
  }
  return [null, null]
}

function applyDrop({ dragNode, node, dropPosition }) {
  const parent = findParent(node)
  if (dropPosition === 'center') {
    const parent = dragNode.parent
    const index = parent.children.findIndex(
      (child) => child.key === dragNode.key
    )
    if (~index) {
      parent.children.splice(index, 1)
      if (!parent.children.length) {
        parent.children = null
      }
    }
    if (Array.isArray(node.children)) {
      if (dropPosition === 'center') {
        node.children.push(dragNode)
      } else {
        node.children.unshift(dragNode)
      }
    } else {
      node.children = [dragNode]
    }
    dragNode.parent = node
  } else if (dropPosition === 'top' || dropPosition === 'bottom') {
    const dragNodeIndex = parent.children.findIndex(
      (child) => child.key === dragNode.key
    )
    if (~dragNodeIndex) {
      parent.children.splice(dragNodeIndex, 1)
      if (!parent.children.length) {
        parent.children = null
      }
    }
    let nodeIndex = parent.children.findIndex((child) => child.key === node.key)
    if (dropPosition === 'bottom') nodeIndex += 1
    if (~nodeIndex) {
      parent.children.splice(nodeIndex, 0, dragNode)
      if (!parent.children.length) {
        parent.children = null
      }
    }
  }
}

export default {
  data() {
    return {
      data: createData(),
      expandedKeys: [],
      checkedKeys: []
    }
  },
  methods: {
    handleExpandedKeysChange(expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    handleCheckedKeysChange(checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    handleDrop({ node, dragNode, dropPosition }) {
      const valid = dropIsValid({ node, dragNode })
      if (!valid) return
      const data = this.data
      const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
        dragNode,
        data
      )
      dragNodeSiblings.splice(dragNodeIndex, 1)
      if (dropPosition === 'center') {
        if (node.children) {
          node.children.unshift(dragNode)
        } else {
          node.children = [dragNode]
        }
      } else if (dropPosition === 'top') {
        const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, data)
        nodeSiblings.splice(nodeIndex, 0, dragNode)
      } else if (dropPosition === 'bottom') {
        const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, data)
        nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
      }
      this.data = Array.from(data)
    },
    handleLoad(node) {
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
