<markdown>
# 前缀

使用 `prefix` 插槽在输入框前添加内容
</markdown>

<script lang="ts" setup>
import { CalendarOutline } from '@vicons/ionicons5'
</script>

<template>
  <n-space vertical>
    <n-date-picker type="date" placeholder="带前缀">
      <template #prefix>
        <n-icon :size="16" :component="CalendarOutline" />
      </template>
    </n-date-picker>
    <n-date-picker type="daterange">
      <template #prefix>
        <n-icon :size="16" :component="CalendarOutline" />
      </template>
    </n-date-picker>
  </n-space>
</template>
