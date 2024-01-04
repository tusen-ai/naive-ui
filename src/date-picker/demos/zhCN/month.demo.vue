<markdown>
# 月份

可以使用 `month-format` 属性指定面板中月份的显示方式。
</markdown>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="timestamp" type="month" clearable />
    <n-date-picker
      v-model:value="timestamp"
      type="month"
      format="y年 M月"
      year-format="y年"
      month-format="M月"
      clearable
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(1183135260000)
    }
  }
})
</script>
