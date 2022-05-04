<markdown>
# Hide button

Use `show-button` prop to control whether to show control buttons.
</markdown>

<template>
  <n-space align="center">
    <n-switch v-model:value="disabled" />
    <n-input-number v-model:value="value" :show-button="disabled" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      disabled: ref(true)
    }
  }
})
</script>
