<markdown>
# 异步加载

设定 `remote` 后，使用 `on-load` 回调来加载数据。异步加载时，所有 `isLeaf` 为 `false` 并且 `children` 不为数组的节点会被视为未加载的节点。
</markdown>

<template>
  <n-tree-select
    remote
    :on-load="handleLoad"
    :options="options"
    @drop="handleDrop"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeSelectOption, TreeSelectDropInfo } from 'naive-ui'

function nextLabel (currentLabel?: string): string {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  if (currentLabel === '三生万物') return '道生一'
  return ''
}

function findSiblingsAndIndex (
  node: TreeSelectOption,
  nodes?: TreeSelectOption[]
): [TreeSelectOption[], number] | [null, null] {
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
    const optionsRef = ref([
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
    ])
    return {
      options: optionsRef,
      handleLoad (node: TreeSelectOption) {
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
      },
      handleDrop ({ node, dragNode, dropPosition }: TreeSelectDropInfo) {
        const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
          dragNode,
          optionsRef.value
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
            optionsRef.value
          )
          if (nodeSiblings === null || nodeIndex === null) return
          nodeSiblings.splice(nodeIndex, 0, dragNode)
        } else if (dropPosition === 'after') {
          const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
            node,
            optionsRef.value
          )
          if (nodeSiblings === null || nodeIndex === null) return
          nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
        }

        optionsRef.value = Array.from(optionsRef.value)
      }
    }
  }
})
</script>
