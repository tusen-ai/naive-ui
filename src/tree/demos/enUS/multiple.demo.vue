<markdown>
# Select multiple nodes

Set `multiple` to select multiple nodes.
</markdown>

<script lang="ts">
import type { TreeOption } from 'naive-ui'
import { repeat } from 'seemly'
import { defineComponent, ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level)
    return undefined
  return repeat(6 - level, undefined).map((_, index) => {
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
    return 'Out of Tao, One is born'
  if (level === 3)
    return 'Out of One, Two'
  if (level === 2)
    return 'Out of Two, Three'
  if (level === 1)
    return 'Out of Three, the created universe'
  return ''
}

export default defineComponent({
  setup() {
    return {
      data: createData(),
      value: ref([])
    }
  }
})
</script>

<template>
  <n-tree multiple block-line :data="data" />
  <n-divider />
  <n-tree v-model="value" multiple block-line :data="data" />
</template>
