<markdown>
# Debug
</markdown>

<script lang="ts">
import type { TreeSelectOption } from 'naive-ui'
import { defineComponent, ref } from 'vue'

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

export default defineComponent({
  setup() {
    return {
      multiple: ref(false),
      checkable: ref(false),
      cascade: ref(false),
      filterable: ref(false),
      options: createData(),
      showPath: ref(false),
      loading: ref(false)
    }
  }
})
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
