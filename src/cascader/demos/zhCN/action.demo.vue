<markdown>
# 插槽

有人要在级联菜单里用这些插槽吗？
</markdown>

<script lang="ts" setup>
import type { CascaderOption } from 'naive-ui'
import Flash16Regular from '@vicons/fluent/Flash16Regular'
import { ref } from 'vue'

function getOptions(depth = 2, iterator = 1, prefix = '') {
  const length = 12
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `${i}`,
        label: `${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${String(i)}`)
      })
    }
    else if (iterator === depth) {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    }
    else {
      options.push({
        value: `${prefix}-${i}`,
        label: `${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

const value = ref(null)
const options = getOptions()
</script>

<template>
  <n-cascader v-model:value="value" placeholder="没啥用的值" :options="options">
    <template #action>
      站在能分割世界的桥
    </template>
    <template #arrow>
      <Flash16Regular />
    </template>
  </n-cascader>
</template>
