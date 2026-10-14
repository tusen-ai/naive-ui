<markdown>
# Prefix

Use the `prefix` slot to add content before the input.
</markdown>

<script lang="ts" setup>
import { CalendarOutline } from '@vicons/ionicons5'
</script>

<template>
  <n-space vertical>
    <n-date-picker type="date" placeholder="With prefix">
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
