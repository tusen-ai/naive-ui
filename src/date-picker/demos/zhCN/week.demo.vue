<markdown>
# 周

默认情况下周选择器会显示周数，如 `第 26 周` 会显示 `26.` 可通过 `show-week-prefix` 属性来控制是否显示周前缀。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const timestamp = ref(1183135260000)
const showWeekPrefix = ref(true)
</script>

<template>
  <n-flex vertical align="flex-start">
    <n-switch v-model:value="showWeekPrefix">
      <template #checked>
        <span>显示周前缀</span>
      </template>
      <template #unchecked>
        <span>省略周前缀</span>
      </template>
    </n-switch>
    <n-date-picker
      v-model:value="timestamp"
      type="week"
      clearable
      :show-week-prefix="showWeekPrefix"
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
  </n-flex>
</template>
