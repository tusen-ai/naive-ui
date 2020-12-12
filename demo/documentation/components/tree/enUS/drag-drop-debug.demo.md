# Drag & Drag

Set `draggable` and write bunch of codes to make drag & drop work.

```html
<n-tree
  block-node
  checkable
  draggable
  :data="data"
  :checked-keys="checkedKeys"
  :expanded-keys="expandedKeys"
  @drop="handleDrop"
  @update:checked-keys="handleCheckedKeysChange"
  @update:expanded-keys="handleExpandedKeysChange"
/>
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
  if (level === 4) return 'Out of Tao, One is born'
  if (level === 3) return 'Out of One, Two'
  if (level === 2) return 'Out of Two, Three'
  if (level === 1) return 'Out of Three, the created universe'
}

function dropIsValid ({ dragNode, node }) {
  /** drop on itselft */
  if (dragNode.key === node.key) return false
  /** shouldn't drop parent to its child */
  const dropNodeInside = (children) => {
    if (!children) return false
    return children.reduce((result, child) => {
      return result || child.key === node.key || dropNodeInside(child.children)
    }, false)
  }
  return !dropNodeInside(dragNode.children)
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

/**
 * You may wonder why the demo is so complicated.
 * I did take both Element UI like & Antd like's API paradigms into consideration.
 * For providing more ability to control the component,
 * Antd's paradigm is better.
 * Although it is harder to get started with.
 * What's more, the time complexity of the demo can be optimized,
 * but I'm too lazy to optimize it.
 */
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
    }
  }
}
```
