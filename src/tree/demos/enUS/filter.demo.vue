<markdown>
# Search

Tree accept `pattern` and `filter` to do searching.
</markdown>

<template>
  <n-space vertical :size="12">
    <n-input v-model:value="pattern" placeholder="Search" />
    <n-switch v-model:value="showIrrelevantNodes">
      <template #checked>
        Show irrelevant nodes
      </template>
      <template #unchecked>
        Hide irrelevant nodes
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
