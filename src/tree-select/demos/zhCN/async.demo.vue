<markdown>
# 异步加载

设定 `remote` 后，使用 `on-load` 回调来加载数据。异步加载时，所有 `isLeaf` 为 `false` 并且 `children` 不为数组的节点会被视为未加载的节点。
</markdown>

<template>
  <n-tree-select remote :on-load="handleLoad" :options="options" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeSelectOption } from 'naive-ui'

function nextLabel (currentLabel?: string): string {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  if (currentLabel === '三生万物') return '道生一'
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
