<markdown>
# 操作按钮尺寸

使用 `button-size` 控制面板内操作按钮（清除、现在、确认）的尺寸。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const ts = ref<number | null>(null)
const range = ref<[number, number] | null>(null)
</script>

<template>
  <n-space vertical>
    <n-date-picker
      v-model:value="ts"
      type="datetime"
      :actions="['clear', 'confirm']"
      button-size="small"
      update-value-on-close
    />
    <n-date-picker
      v-model:value="ts"
      type="datetime"
      :actions="['clear', 'confirm']"
      button-size="medium"
      update-value-on-close
    />
    <n-date-picker
      v-model:value="range"
      type="datetimerange"
      :actions="['clear', 'confirm']"
      button-size="large"
      update-value-on-close
    />
  </n-space>
</template>
