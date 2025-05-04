<markdown>
# mask

Use mask = true to turn on password mode
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321')
</script>

<template>
  <n-input-opt v-model="value" mask />
</template>
