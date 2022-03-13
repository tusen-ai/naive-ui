<markdown>
# Async loading

After set `remote`, use `on-load` callback to load data. When loading async, all nodes with `isLeaf` set to `false` and `chilren`'s type is not `Array` will be reckon as unloaded nodes.
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
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
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
