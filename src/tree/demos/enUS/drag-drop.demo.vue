<markdown>
# Drag & drop

Set `draggable` and write bunch of codes to make drag & drop work.
</markdown>

<script lang="ts" setup>
import type { TreeDropInfo, TreeOption } from 'naive-ui'
import { repeat } from 'seemly'
import { ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level)
    return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = `${baseKey}${level}${index}`
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel(level: number): string {
  if (level === 4)
    return 'Out of Tao, One is born'
  if (level === 3)
    return 'Out of One, Two'
  if (level === 2)
    return 'Out of Two, Three'
  if (level === 1)
    return 'Out of Three, the created universe'
  return ''
}

function findSiblingsAndIndex(
  node: TreeOption,
  nodes?: TreeOption[]
): [TreeOption[], number] | [null, null] {
  if (!nodes)
    return [null, null]
  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i]
    if (siblingNode.key === node.key)
      return [nodes, i]
    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children)
    if (siblings && index !== null)
      return [siblings, index]
  }
  return [null, null]
}

/**
 * The time complexity of the demo can be optimized,
 * but I'm too lazy to optimize it.
 */
const expandedKeysRef = ref<string[]>([])
const checkedKeysRef = ref<string[]>([])
const dataRef = ref(createData() || [])

function handleExpandedKeysChange(expandedKeys: string[]) {
  expandedKeysRef.value = expandedKeys
}

function handleCheckedKeysChange(checkedKeys: string[]) {
  checkedKeysRef.value = checkedKeys
}

function handleDrop({ node, dragNode, dropPosition }: TreeDropInfo) {
  const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
    dragNode,
    dataRef.value
  )
  if (dragNodeSiblings === null || dragNodeIndex === null)
    return
  dragNodeSiblings.splice(dragNodeIndex, 1)
  if (dropPosition === 'inside') {
    if (node.children) {
      node.children.unshift(dragNode)
    }
    else {
      node.children = [dragNode]
    }
  }
  else if (dropPosition === 'before') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, dataRef.value)
    if (nodeSiblings === null || nodeIndex === null)
      return
    nodeSiblings.splice(nodeIndex, 0, dragNode)
  }
  else if (dropPosition === 'after') {
    const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(node, dataRef.value)
    if (nodeSiblings === null || nodeIndex === null)
      return
    nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
  }
  dataRef.value = Array.from(dataRef.value)
}
</script>

<template>
  <n-tree
    block-line
    checkable
    draggable
    :data="dataRef"
    :checked-keys="checkedKeysRef"
    :expanded-keys="expandedKeysRef"
    @drop="handleDrop"
    @update:checked-keys="handleCheckedKeysChange"
    @update:expanded-keys="handleExpandedKeysChange"
  />
</template>
