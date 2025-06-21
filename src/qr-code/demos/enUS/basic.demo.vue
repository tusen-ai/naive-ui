<markdown>
  # Basic

  A basic QR Code.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref('The rain dampened the sky')
</script>

<template>
  <n-space vertical>
    <n-qr-code :value="text" />
    <n-input v-model:value="text" :maxlength="60" type="text" />
  </n-space>
</template>
