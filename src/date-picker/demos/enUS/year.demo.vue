<markdown>
# Year
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      timestamp: ref(1183135260000)
    }
  }
})
</script>

<template>
  <n-date-picker v-model:value="timestamp" type="year" clearable />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>
