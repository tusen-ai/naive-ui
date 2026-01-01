<markdown>
# Async expand tree data

Change data in `onLoad` prop.
</markdown>

<script lang="ts" setup>
import type { DataTableColumns } from 'naive-ui'
import { ref } from 'vue'

const columns: DataTableColumns = [
  { type: 'selection' },
  { key: 'example', title: 'Example' }
]
const dataRef = ref([
  { key: 'p1', example: 'p1', isLeaf: false },
  { key: 'p2', example: 'p2', isLeaf: false },
  { key: 'p3', example: 'p3', isLeaf: false }
])

function onLoad(row: Record<string, unknown>) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      row.children = [{ key: `${row.key}-1`, example: `${row.key}-1` }]
      resolve()
    }, 1000)
  })
}
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="dataRef"
    :cascade="false"
    allow-checking-not-loaded
    @load="onLoad"
  />
</template>
