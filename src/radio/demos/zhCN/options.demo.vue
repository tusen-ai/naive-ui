<markdown>
# 使用 Options

通过 `options` 属性直接传入选项数据，可以通过 `label-field` 和 `value-field` 自定义字段名。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
const options = [
  { label: '北京', value: 'Beijing' },
  { label: '上海', value: 'Shanghai' },
  { label: '广州', value: 'Guangzhou' },
  { label: '深圳', value: 'Shenzhen', disabled: true }
]

const customFieldValue = ref(null)
const customFieldOptions = [
  { name: '苹果', id: 1 },
  { name: '香蕉', id: 2 },
  { name: '橘子', id: 3 }
]
</script>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="value" :options="options" />
    <n-radio-group
      v-model:value="customFieldValue"
      :options="customFieldOptions"
      label-field="name"
      value-field="id"
    />
  </n-space>
</template>
