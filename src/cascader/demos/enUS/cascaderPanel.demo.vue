<markdown>
# Cascader panel

CascaderPanel is the core component of Cascader which has various of features such as single selection, multiple selection, dynamic loading and so on.

Just like el-cascader, you can set alternative options by options, and enable other features by props, see the API form below for details.
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
      placeholder="Meaningless values"
      :options="options"
    >
      <template #action>
        Standing on a bridge that can divide the world
      </template>
      <template #arrow>
        <Flash16Regular />
      </template>
    </n-cascader-panel>

    <n-cascader-panel
      v-model:value="value2"
      placeholder="Meaningless values"
      multiple
      :options="options"
    >
      <template #action>
        Standing on a bridge that can divide the world
      </template>
      <template #arrow>
        <Flash16Regular />
      </template>
    </n-cascader-panel>
  </n-space>
</template>
