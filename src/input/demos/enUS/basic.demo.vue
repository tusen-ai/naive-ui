<markdown>
# Basic

Basic use of `n-input`.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(null)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-input v-model:value="value" type="text" placeholder="Basic Input" />
    <n-input
      v-model:value="value"
      type="textarea"
      placeholder="Basic Textarea"
    />
  </n-space>
</template>
