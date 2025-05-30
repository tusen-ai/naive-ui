<markdown>
# 级联面板

级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

和级联选择器一样，通过 options 来指定选项，也可通过 props 来设置多选、动态加载等功能，具体详情见下方API表格。
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

const value2 = ref(null)
const options = getOptions()
</script>

<template>
  <n-space vertical>
    <n-cascader-panel
      v-model:value="value"
      placeholder="没啥用的值"
      :options="options"
    >
      <template #action>
        站在能分割世界的桥
      </template>
      <template #arrow>
        <Flash16Regular />
      </template>
    </n-cascader-panel>

    <n-cascader-panel
      v-model:value="value2"
      placeholder="没啥用的值"
      multiple
      :options="options"
    >
      <template #action>
        站在能分割世界的桥
      </template>
      <template #arrow>
        <Flash16Regular />
      </template>
    </n-cascader-panel>
  </n-space>
</template>
