<markdown>
# Async expand tree data

Change data in `onLoad` prop.
</markdown>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :cascade="false"
    allow-checking-not-loaded
    @load="onLoad"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DataTableColumns } from 'naive-ui'

export default defineComponent({
  setup () {
    const columns: DataTableColumns = [
      { type: 'selection' },
      { key: 'example', title: 'Example' }
    ]
    const dataRef = ref([
      { key: 'p1', example: 'p1', isLeaf: false },
      { key: 'p2', example: 'p2', isLeaf: false },
      { key: 'p3', example: 'p3', isLeaf: false }
    ])
    return {
      columns,
      data: dataRef,
      onLoad (row: Record<string, unknown>) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            row.children = [{ key: row.key + '-1', example: row.key + '-1' }]
            resolve()
          }, 1000)
        })
      }
    }
  }
})
</script>
