# 拖放节点
设定 `draggable` 然后自己写一堆代码来支持节点的拖放。
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
  return Array
    .apply(null, { length: 6 - level })
    .map((_, index) => {
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
function dropIsValid ({
  dragNode,
  node
}) {
  /** drop on itselft */
  if (dragNode.key === node.key) return false
  /** shouldn't drop parent to its child */
  const childKeys = []
  const dropNodeInside = children => {
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

function applyDrop ({
  dragNode,
  node,
  dropPosition
}) {
  const parent = findParent(node)
  if (dropPosition === 'center') {
    const parent = dragNode.parent
    const index = parent.children.findIndex(child => child.key === dragNode.key)
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
    const dragNodeIndex = parent.children.findIndex(child => child.key === dragNode.key)
    if (~dragNodeIndex) {
      parent.children.splice(dragNodeIndex, 1)
      if (!parent.children.length) {
        parent.children = null
      }
    }
    let nodeIndex = parent.children.findIndex(child => child.key === node.key)
    if (dropPosition === 'bottom') nodeIndex += 1
    if (~nodeIndex) {
      parent.children.splice(nodeIndex, 0, dragNode)
      if (!parent.children.length) {
        parent.children = null
      }
    }
  }
}

/**
 * 你可能好奇为什么要把这个东西搞这么复杂
 * 我确实思考过 Element 和 Antd 他们不同的提供接口的方法
 * 为了给用户提供更强的控制能力 我选择了 Antd 的范式
 * 诚然这样使用门槛更高一点
 * 然后这个例子的时间复杂度确实可以优化 我实在是懒得改了
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
    handleDrop ({
      node,
      dragNode,
      dropPosition
    }) {
      const valid = dropIsValid({ node, dragNode })
      if (!valid) return
      const data = this.data
      const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(dragNode, data)
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