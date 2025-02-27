<markdown>
# 禁用

禁用整个组件或者禁用单个选项。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('Shakermaker')
const options = ref([
  {
    value: 'Rock\'n\'Roll Star',
    label: 'Rock\'n\'Roll Star',
    disabled: true
  },
  {
    value: 'Shakermaker',
    label: 'Shakermaker'
  },
  {
    value: 'Live Forever',
    label: 'Live Forever',
    disabled: true
  },
  {
    value: 'Up in the Sky',
    label: 'Up in the Sky',
    disabled: true
  },
  {
    value: '...',
    label: '...',
    disabled: true
  }
])

const value2 = ref('茴')
const options1 = ref([
  {
    label: '茴',
    value: '茴'
  },
  {
    label: '回',
    value: '回'
  },
  {
    label: '囘',
    value: '囘'
  },
  {
    label: '囬',
    value: '囬'
  }
])
</script>

<template>
  <n-space vertical>
    <n-segment v-model:value="value1" :options="options" />
    <n-segment v-model:value="value2" :options="options1" disabled />
  </n-space>
</template>
