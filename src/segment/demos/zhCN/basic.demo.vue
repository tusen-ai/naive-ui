<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import type { SegmentItemType } from 'naive-ui'
import { ref } from 'vue'

const value = ref('Shakermaker')

const options = ref<SegmentItemType[]>([
  {
    value: 'Rock\'n\'Roll Star',
    label: 'Rock\'n\'Roll Star'
  },
  {
    value: 'Shakermaker',
    label: 'Shakermaker'
  },
  {
    value: 'Live Forever',
    label: 'Live Forever'
  },
  {
    value: 'Up in the Sky',
    label: 'Up in the Sky'
  },
  {
    value: '...',
    label: '...'
  }
])
</script>

<template>
  <n-segment v-model:value="value" :options="options" />
</template>
