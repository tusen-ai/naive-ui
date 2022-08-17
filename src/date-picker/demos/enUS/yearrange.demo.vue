<markdown>
# Year range
</markdown>

<template>
  <n-date-picker v-model:value="timestamp" type="yearrange" clearable />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref<{ from: number; to: number }>({
        from: 1183135260000,
        to: Date.now()
      })
    }
  }
})
</script>
