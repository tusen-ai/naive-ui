<markdown>
# 日期
</markdown>

<template>
  <n-date-picker v-model:value="timestamp" type="date" />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
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
