<markdown>
# 回退选项

如果你不需要回退选项，将 `fallback-option` 设为 `false` 即可，这时只有出现在选项中的值才会被视为合法值，在操作的过程中不合法的值会被清除掉。
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

const singleValue = ref('一个不知哪里来的值')
const multipleValue = ref(['一个不知哪里来的值', '两个不知哪里来的值'])
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
      placeholder="无回退选项"
      :fallback-option="false"
      :options="options"
    />
    <n-cascader
      v-model:value="multipleValue"
      placeholder="无回退选项"
      multiple
      :fallback-option="false"
      :options="options"
    />
  </n-space>
</template>
