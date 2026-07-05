<markdown>
# Step

Set how much the buttons change the value.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <n-input-number v-model:value="value" :step="2" />
</template>
