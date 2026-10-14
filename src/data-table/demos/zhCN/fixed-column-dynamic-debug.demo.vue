<markdown>
  # Dynamic Columns With Right Fixed Shadow

  左侧 `fixed: 'left'` 和右侧 `fixed: 'right'`，中间列可以动态增删。用按钮增删列让内容溢出后，最后一列的右侧阴影应该正常出现（无论是否设置 `scroll-x`）。
</markdown>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const extraColumnCount = ref(2)
const scrollXMode = ref<'none' | 'percent' | 'number'>('none')

const scrollX = computed(() => {
  if (scrollXMode.value === 'percent')
    return '100%'
  if (scrollXMode.value === 'number')
    return 2000
  return undefined
})

const columns = computed(() => {
  const extraColumns = Array.from(
    { length: extraColumnCount.value },
    (_, i) => ({
      title: `Extra ${i + 1}`,
      key: `extra-${i}`,
      width: 140
    })
  )
  return [
    { title: 'Name', key: 'name', fixed: 'left', width: 140 },
    ...extraColumns,
    { title: 'Status', key: 'status', width: 140 },
    { title: 'Action', key: 'action', fixed: 'right', width: 140 }
  ]
})

const data = Array.from({ length: 8 })
  .fill(null)
  .map((_, i) => {
    const row: Record<string, unknown> = {
      key: i,
      name: `Name ${i + 1}`,
      status: i % 2 === 0 ? 'Enabled' : 'Disabled',
      action: 'Delete'
    }
    for (let j = 0; j < 60; ++j) {
      row[`extra-${j}`] = `extra ${j + 1} - ${i + 1}`
    }
    return row
  })
</script>

<template>
  <n-space vertical>
    <n-space align="center">
      <n-button @click="extraColumnCount = Math.min(extraColumnCount + 1, 20)">
        Add column
      </n-button>
      <n-button @click="extraColumnCount = Math.max(extraColumnCount - 1, 0)">
        Remove column
      </n-button>
      <n-radio-group v-model:value="scrollXMode">
        <n-radio-button value="none">
          scroll-x: none
        </n-radio-button>
        <n-radio-button value="percent">
          scroll-x: 100%
        </n-radio-button>
        <n-radio-button value="number">
          scroll-x: 2000
        </n-radio-button>
      </n-radio-group>
    </n-space>
    <n-data-table
      bordered
      :max-height="240"
      :columns="columns"
      :data="data"
      :scroll-x="scrollX"
    />
  </n-space>
</template>
