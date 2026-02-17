<markdown>
# 当选择年、月后，关闭年月面板

通过使用 `fast-year-select` 和 `fast-month-select` 属性，可以实现当选择年、月后，关闭年月面板。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      timestamp: ref(1183135260000),
      range: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>

<template>
  <NFlex vertical>
    <n-date-picker
      v-model:value="timestamp"
      type="date"
      fast-year-select
      fast-month-select
    />
    <n-date-picker
      v-model:value="timestamp"
      type="datetime"
      fast-year-select
      fast-month-select
    />
    <n-date-picker
      v-model:value="range"
      type="daterange"
      fast-year-select
      fast-month-select
    />
    <n-date-picker
      v-model:value="range"
      type="datetimerange"
      fast-year-select
      fast-month-select
    />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
  </NFlex>
</template>
