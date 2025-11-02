<markdown>
# 大量数据

设定 `virtual-scroll` 使用虚拟滚动，注意要设定好树的高度。
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
    return '道生一'
  if (level === 3)
    return '一生二'
  if (level === 2)
    return '二生三'
  if (level === 1)
    return '三生万物'
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
        滚动
      </n-button>
      <n-button @click="handleScrollToPosition">
        滚动到指定位置
      </n-button>
      <n-button @click="handleScrollToIndex">
        滚动到指定 Index
      </n-button>
      <n-button @click="handleScrollToDistance">
        滚动到指定距离
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
