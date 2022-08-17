<markdown>
# 日期时间范围
</markdown>

<template>
  <n-date-picker v-model:value="range" type="datetimerange" clearable />
  <pre>{{ JSON.stringify(range) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      range: ref<{ from: number; to: number }>({
        from: 1183135260000,
        to: Date.now()
      })
    }
  }
})
</script>
