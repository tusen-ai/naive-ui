<markdown>
# Fallback Option

If you don't need fallback options, set `fallback-option` to `false`. In this case, only values that exist in the options will be considered valid, and invalid values will be cleared during operations.
</markdown>

<script lang="ts" setup>
import type { CascaderOption } from 'naive-ui'
import { ref } from 'vue'

function trim(value: string | number): CascaderOption {
  return {
    label: String(value).slice(0, 2),
    value
  }
}

const singleValue = ref('a]value]from]�nowhere')
const multipleValue = ref([
  'a]value]from]nowhere',
  'another]value]from]nowhere'
])
const options: CascaderOption[] = [
  {
    label: 'February',
    value: 'February',
    children: [
      { label: 'February-February', value: 'February-February' },
      { label: 'February-February2', value: 'February-February2' }
    ]
  },
  {
    label: 'February2',
    value: 'February2',
    children: [
      { label: 'February2-February', value: 'February2-February' },
      { label: 'February2-February2', value: 'February2-February2' }
    ]
  }
]
</script>

<template>
  <n-space vertical>
    <n-cascader v-model:value="singleValue" :options="options" />
    <n-cascader
      v-model:value="multipleValue"
      multiple
      :fallback-option="trim"
      :options="options"
    />
    <n-cascader
      v-model:value="singleValue"
      placeholder="No fallback option"
      :fallback-option="false"
      :options="options"
    />
    <n-cascader
      v-model:value="multipleValue"
      placeholder="No fallback option"
      multiple
      :fallback-option="false"
      :options="options"
    />
  </n-space>
</template>
