<markdown>
# Date range
</markdown>

<template>
  <n-date-picker v-model:value="range" type="daterange" clearable />
  <pre>{{ JSON.stringify(range) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      range: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>
