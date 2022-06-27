<markdown>
# 季度范围
</markdown>

<template>
  <n-date-picker v-model:value="timestamp" type="quarterrange" clearable />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>
