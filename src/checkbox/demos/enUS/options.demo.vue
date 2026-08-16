<markdown>
# Using Options

Pass option data directly through the `options` prop. You can also customize field names with `label-field` and `value-field`.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<Array<string | number> | null>(null)
const options = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
  { label: 'Guangzhou', value: 'Guangzhou' },
  { label: 'Shenzhen', value: 'Shenzhen', disabled: true }
]

const customFieldValue = ref<Array<string | number> | null>(null)
const customFieldOptions = [
  { name: 'Apple', id: 1 },
  { name: 'Banana', id: 2 },
  { name: 'Orange', id: 3 }
]
</script>

<template>
  <n-space vertical>
    <n-checkbox-group v-model:value="value" :options="options" />
    <n-checkbox-group
      v-model:value="customFieldValue"
      :options="customFieldOptions"
      label-field="name"
      value-field="id"
    />
  </n-space>
</template>
