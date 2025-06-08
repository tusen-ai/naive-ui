<markdown>
# Mask

Set `mask=true` to turn on input mask.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321'.split(''))
</script>

<template>
  <n-input-otp v-model:value="value" mask />
</template>
