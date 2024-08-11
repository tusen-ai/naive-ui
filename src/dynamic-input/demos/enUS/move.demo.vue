<markdown>
# Show sort button
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(['', '', ''])
    }
  }
})
</script>

<template>
  <n-dynamic-input
    v-model:value="value"
    placeholder="Come on"
    show-sort-button
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>
