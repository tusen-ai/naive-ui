<markdown>
  # Placement
  </markdown>

<template>
  <n-flex>
    <n-dynamic-input
      v-model:value="value"
      show-sort-button
      placeholder="Please input"
      placement="left"
    />
    <n-dynamic-input
      v-model:value="value"
      show-sort-button
      placeholder="Please input"
      placement="right"
    />
  </n-flex>
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(['', '', ''])
    }
  }
})
</script>
