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
import { defineComponent, ref } from 'vue'

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

export default defineComponent({
  setup () {
    const expandedKeysRef = ref([])
    const checkedKeysRef = ref([])
    const dataRef = ref(createData())

    return {
      data: dataRef,
      expandedKeys: expandedKeysRef,
      checkedKeys: checkedKeysRef,
      handleExpandedKeysChange (expandedKeys) {
        expandedKeysRef.value = expandedKeys
      },
      handleCheckedKeysChange (checkedKeys) {
        checkedKeysRef.value = checkedKeys
      },
      handleDrop ({ node, dragNode, dropPosition }) {
        const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
          dragNode,
          dataRef.value
        )
        dragNodeSiblings.splice(dragNodeIndex, 1)
        if (dropPosition === 'inside') {
          if (node.children) {
            node.children.unshift(dragNode)
          } else {
            node.children = [dragNode]
          }
        } else if (dropPosition === 'before') {
          const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
            node,
            dataRef.value
          )
          nodeSiblings.splice(nodeIndex, 0, dragNode)
        } else if (dropPosition === 'after') {
          const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
            node,
            dataRef.value
          )
          nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
        }

        dataRef.value = Array.from(dataRef.value)
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
})
```
