<markdown>
# Large data

In this example there are 5000 \* 2 \* 2 = 20000 entries.
</markdown>

<script lang="ts" setup>
import type { CascaderOption } from 'naive-ui'
import { ref } from 'vue'

function getOptions(depth = 3, iterator = 1, prefix = '') {
  const length = iterator === 1 ? 5000 : 2
  const options: CascaderOption[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${String(i)}`)
      })
    }
    else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    }
    else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

const checkStrategyIsChild = ref(true)
const cascade = ref(true)
const showPath = ref(true)
const hoverTrigger = ref(false)
const filterable = ref(false)
const value = ref(null)
const options = getOptions()
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-space>
        <n-switch v-model:value="checkStrategyIsChild" />Child Check Strategy
      </n-space>
      <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
      <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
      <n-space><n-switch v-model:value="hoverTrigger" />Hover Trigger</n-space>
      <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
    </n-space>
    <n-cascader
      v-model:value="value"
      placeholder="Meaningless Value"
      :expand-trigger="hoverTrigger ? 'hover' : 'click'"
      :options="options"
      :cascade="cascade"
      :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
      :show-path="showPath"
      :filterable="filterable"
    />
  </n-space>
</template>
