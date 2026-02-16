<markdown>
# 范围选择

使用 `type="timerange"` 来选择时间范围。当结束时间早于开始时间时，点击确认会自动交换。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-time-picker v-model:value="value" type="timerange" />
    <n-time-picker
      type="timerange"
      :default-value="[1183135260000, 1183155000000]"
    />
  </n-space>
</template>
