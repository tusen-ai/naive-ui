<markdown>
# Large data

Set `virtual-scroll` to use virtual scroll. Note that you should set the height of the tree.
</markdown>

<script lang="ts" setup>
import type { TreeInst, TreeOption } from 'naive-ui'
import { repeat } from 'seemly'
import { ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level)
    return undefined
  return repeat(10 - level, undefined).map((_, index) => {
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

const treeInstRef = ref<TreeInst | null>(null)
const data = createData()

function handleScrollToKey() {
  treeInstRef.value?.scrollTo({ key: '45362710' })
}

function handleScrollToPosition() {
  treeInstRef.value?.scrollTo({ position: 'bottom' })
}

function handleScrollToIndex() {
  treeInstRef.value?.scrollTo({ index: 100 })
}

function handleScrollToDistance() {
  treeInstRef.value?.scrollTo({ top: 400 })
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="handleScrollToKey">
        Scroll
      </n-button>
      <n-button @click="handleScrollToPosition">
        Scroll to position
      </n-button>
      <n-button @click="handleScrollToIndex">
        Scroll to index
      </n-button>
      <n-button @click="handleScrollToDistance">
        Scroll to distance
      </n-button>
    </n-space>
    <n-tree
      ref="treeInstRef"
      block-line
      :data="data"
      default-expand-all
      virtual-scroll
      style="height: 320px"
    />
  </n-space>
</template>
