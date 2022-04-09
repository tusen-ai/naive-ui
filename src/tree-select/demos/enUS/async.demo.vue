<markdown>
# Async loading

Use `on-load` callback to load data. When loading async, all nodes with `isLeaf` set to `false` and `chilren`'s type is not `Array` will be reckon as unloaded nodes.
</markdown>

<template>
  <n-tree-select :on-load="handleLoad" :options="options" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeSelectOption } from 'naive-ui'

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
      }
    }
  }
})
</script>
