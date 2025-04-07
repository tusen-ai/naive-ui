<markdown>
# Basic usage

The number of characters is defined by the length option, which is set to 6 by default.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321')
</script>

<template>
  <n-input-opt v-model:value="value" />
</template>
