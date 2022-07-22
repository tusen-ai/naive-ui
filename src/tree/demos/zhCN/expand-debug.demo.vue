<markdown>
# Expand debug
</markdown>

<template>
  <n-tree
    v-model:expanded-keys="expandedKeys"
    block-line
    :data="data"
    selectable
    @update:selected-keys="onSelect"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const expandedKeys = ref<string[]>([])

    return {
      data: [
        {
          key: 'node-root',
          label: '根节点',
          children: [
            { key: 'node-1', label: '节点1' },
            { key: 'node-2', label: '节点2' }
          ]
        }
      ],
      expandedKeys,
      onSelect (keys: string[]) {
        expandedKeys.value.push(keys[0])
      }
    }
  }
})
</script>
