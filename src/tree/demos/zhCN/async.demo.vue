<markdown>
# 异步加载

设定 `remote` 后，使用 `on-load` 回调来加载数据。异步加载时，所有 `isLeaf` 为 `false` 并且 `children` 不为数组的节点会被视为未加载的节点。
</markdown>

<template>
  <n-tree
    block-line
    checkable
    remote
    draggable
    :data="data"
    :checked-keys="checkedKeys"
    :on-load="handleLoad"
    :expanded-keys="expandedKeys"
    @drop="handleDrop"
    @update:checked-keys="handleCheckedKeysChange"
    @update:expanded-keys="handleExpandedKeysChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeDropInfo, TreeOption } from 'naive-ui'

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

function nextLabel (currentLabel?: string): string {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  if (currentLabel === '三生万物') return '道生一'
  return ''
}

function findSiblingsAndIndex (
  node: TreeOption,
  nodes?: TreeOption[]
): [TreeOption[], number] | [null, null] {
  if (!nodes) return [null, null]
  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i]
    if (siblingNode.key === node.key) return [nodes, i]
    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children)
    if (siblings && index !== null) return [siblings, index]
  }
  return [null, null]
}

export default defineComponent({
  setup () {
    const expandedKeysRef = ref<string[]>([])
    const checkedKeysRef = ref<string[]>([])
    const dataRef = ref(createData())

    return {
      data: dataRef,
      expandedKeys: expandedKeysRef,
      checkedKeys: checkedKeysRef,
      handleExpandedKeysChange (expandedKeys: string[]) {
        expandedKeysRef.value = expandedKeys
      },
      handleCheckedKeysChange (checkedKeys: string[]) {
        checkedKeysRef.value = checkedKeys
      },
      handleDrop ({ node, dragNode, dropPosition }: TreeDropInfo) {
        const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
          dragNode,
          dataRef.value
        )
        if (dragNodeSiblings === null || dragNodeIndex === null) return
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
          if (nodeSiblings === null || nodeIndex === null) return
          nodeSiblings.splice(nodeIndex, 0, dragNode)
        } else if (dropPosition === 'after') {
          const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
            node,
            dataRef.value
          )
          if (nodeSiblings === null || nodeIndex === null) return
          nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
        }

        dataRef.value = Array.from(dataRef.value)
      },
      handleLoad (node: TreeOption) {
        return new Promise<void>((resolve) => {
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
</script>
