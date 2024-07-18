<markdown>
  # Basic

  A basic QR Code.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const text = ref('The rain dampened the sky')
    return {
      text
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-qr-code :value="text" />
    <n-input v-model:value="text" :maxlength="60" type="text" />
  </n-space>
</template>
