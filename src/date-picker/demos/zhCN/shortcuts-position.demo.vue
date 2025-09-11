<markdown>
# 快捷位置

使用 `shortcuts-position` 属性控制快捷按钮面板显示的位置。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const dateLeft = ref<number | null>(null)
const dateBottom = ref<number | null>(null)
const rangeRight = ref<[number, number] | null>(null)

const shortcuts = {
  昨天: () => Date.now() - 24 * 60 * 60 * 1000,
  '过去 7 天': () => Date.now() - 7 * 24 * 60 * 60 * 1000
}

const rangeShortcuts = {
  本月: () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    return [start, now.getTime()] as const
  },
  '过去 2 小时': () => {
    const cur = Date.now()
    return [cur - 2 * 60 * 60 * 1000, cur] as const
  }
}
</script>

<template>
  <n-space vertical>
    <n-date-picker
      v-model:value="dateLeft"
      type="date"
      :shortcuts="shortcuts"
      shortcuts-position="left"
    />
    <n-date-picker
      v-model:value="rangeRight"
      type="daterange"
      :shortcuts="rangeShortcuts"
      shortcuts-position="right"
    />
    <n-date-picker
      v-model:value="dateBottom"
      type="date"
      :shortcuts="shortcuts"
      shortcuts-position="bottom"
    />
  </n-space>
</template>
