<markdown>
# Expand debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const expandedKeys = ref<string[]>([])

const data = [
  {
    key: 'node-root',
    label: '根节点',
    children: [
      { key: 'node-1', label: '节点1' },
      { key: 'node-2', label: '节点2' }
    ]
  }
]

function onSelect(keys: string[]) {
  expandedKeys.value.push(keys[0])
}
</script>

<template>
  <n-tree
    v-model:expanded-keys="expandedKeys"
    block-line
    :data="data"
    selectable
    @update:selected-keys="onSelect"
  />
</template>
