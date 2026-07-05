<markdown>
# Basic

A countdown string.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)
</script>

<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums">
      <n-countdown :duration="5000" :active="active" />
    </span>
    <n-switch v-model:value="active" />
  </n-space>
</template>
