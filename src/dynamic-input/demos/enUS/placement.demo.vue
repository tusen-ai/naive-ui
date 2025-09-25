<markdown>
  # Position
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
  <n-flex>
    <n-dynamic-input
      v-model:value="value"
      show-sort-button
      placeholder="Please enter"
      placement="left"
    />
    <n-dynamic-input
      v-model:value="value"
      show-sort-button
      placeholder="Please enter"
      placement="right"
    />
  </n-flex>
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>
