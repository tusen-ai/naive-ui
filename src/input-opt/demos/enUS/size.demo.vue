<markdown>
# size

InputOtp provides small and large sizes as alternatives to the base.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321')
</script>

<template>
  <n-space vertical>
    <n-input-opt v-model="value" size="small" />
    <n-input-opt v-model="value" />
    <n-input-opt v-model="value" size="large" />
  </n-space>
</template>
