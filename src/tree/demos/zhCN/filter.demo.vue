<markdown>
# 搜索

树接受 `pattern` 和 `filter` 来完成搜索。
</markdown>

<template>
  <n-space vertical :size="12">
    <n-input v-model:value="pattern" placeholder="搜索" />
    <n-switch v-model:value="showIrrelevantNodes">
      <template #checked>
        展示搜索无关的节点
      </template>
      <template #unchecked>
        隐藏搜索无关的节点
      </template>
    </n-switch>
    <n-tree
      :show-irrelevant-nodes="showIrrelevantNodes"
      :pattern="pattern"
      :data="data"
      block-line
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeOption } from 'naive-ui'

const data: TreeOption[] = [
  {
    label: '0',
    key: '0',
    children: [
      {
        label: '0-0',
        key: '0-0',
        children: [
          { label: '0-0-0', key: '0-0-0' },
          { label: '0-0-1', key: '0-0-1' }
        ]
      },
      {
        label: '0-1',
        key: '0-1',
        children: [
          { label: '0-1-0', key: '0-1-0' },
          { label: '0-1-1', key: '0-1-1' }
        ]
      }
    ]
  },
  {
    label: '1',
    key: '1',
    children: [
      {
        label: '1-0',
        key: '1-0',
        children: [
          { label: '1-0-0', key: '1-0-0' },
          { label: '1-0-1', key: '1-0-1' }
        ]
      },
      {
        label: '1-1',
        key: '1-1',
        children: [
          { label: '1-1-0', key: '1-1-0' },
          { label: '1-1-1', key: '1-1-1' }
        ]
      }
    ]
  }
]

export default defineComponent({
  setup () {
    return {
      data,
      pattern: ref(''),
      showIrrelevantNodes: ref(false)
    }
  }
})
</script>
