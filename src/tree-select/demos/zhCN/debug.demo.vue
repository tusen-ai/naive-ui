<markdown>
# Debug
</markdown>

<script lang="ts" setup>
import type { TreeSelectOption } from 'naive-ui'
import { ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeSelectOption[] | undefined {
  if (!level)
    return undefined
  return Array.from({ length: 6 - level }).map((_, index) => {
    const key = `${baseKey}${level}${index}`
    return {
      label: key,
      key,
      children: createData(level - 1, key)
    }
  })
}

const multiple = ref(false)
const checkable = ref(false)
const cascade = ref(false)
const filterable = ref(false)
const options = createData()
const showPath = ref(false)
const loading = ref(false)
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-switch v-model:value="multiple" />Multiple
      <n-switch v-model:value="checkable" />Checkable
      <n-switch v-model:value="cascade" />Cascade
      <n-switch v-model:value="filterable" />Filterable
      <n-switch v-model:value="showPath" />ShowPath
      <n-switch v-model:value="loading" />Loading
    </n-space>
    <n-tree-select
      default-expand-all
      :options="options"
      :multiple="multiple"
      :checkable="checkable"
      :cascade="cascade"
      :filterable="filterable"
      :show-path="showPath"
      :loading="loading"
    />
  </n-space>
</template>
