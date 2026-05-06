<markdown>
# Using Options

Use the `options` prop to pass option data directly, You can use `label-field` and `value-field` to customize field names.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
const options = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
  { label: 'Guangzhou', value: 'Guangzhou' },
  { label: 'Shenzhen', value: 'Shenzhen', disabled: true }
]

const customFieldValue = ref(null)
const customFieldOptions = [
  { name: 'Apple', id: 1 },
  { name: 'Banana', id: 2 },
  { name: 'Orange', id: 3 }
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
