<markdown>
# Loading

`input` has a loading state.
</markdown>

<template>
  <n-input
    v-model:value="value"
    type="text"
    placeholder="Basic Input"
    loading
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
