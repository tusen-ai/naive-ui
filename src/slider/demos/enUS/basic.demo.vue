<markdown>
# Basic
</markdown>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" :step="10" />
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(50)
    }
  }
})
</script>
