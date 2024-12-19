<markdown>
  # Show Line
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
      showLine: ref(false),
      data: createData(),
      defaultExpandedKeys: ref(['40', '4030', '403020'])
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-switch v-model:value="showLine" />
    <n-tree
      :show-line="showLine"
      :default-expanded-keys="defaultExpandedKeys"
      :data="data"
      checkable
      expand-on-click
      selectable
    />
  </n-space>
</template>
