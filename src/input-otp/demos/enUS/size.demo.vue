<markdown>
# Size
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321'.split(''))
</script>

<template>
  <n-space vertical>
    <n-input-otp v-model:value="value" size="small" />
    <n-input-otp v-model:value="value" />
    <n-input-otp v-model:value="value" size="large" />
  </n-space>
</template>
