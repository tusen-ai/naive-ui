<markdown>
# 自定义选项渲染
</markdown>

<script lang="ts" setup>
import type { SegmentItemType } from 'naive-ui'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
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
    value: 1,
    label: '1'
  }
])
</script>

<template>
  <n-segment v-model:value="value" size="small" :options="options">
    <template #label="{ value: val, label }">
      <div style="padding: 4px 4px">
        <n-icon>
          <CashIcon />
        </n-icon>
        <div>{{ val }}</div>
        <div>{{ label }}</div>
      </div>
    </template>
  </n-segment>
</template>
