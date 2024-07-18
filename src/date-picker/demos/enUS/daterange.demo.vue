<markdown>
# Date range
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      range: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>

<template>
  <n-date-picker v-model:value="range" type="daterange" clearable />
  <pre>{{ JSON.stringify(range) }}</pre>
</template>
