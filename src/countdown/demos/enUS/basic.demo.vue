<markdown>
# Basic

A countdown string.
</markdown>

<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums">
      <n-countdown :duration="5000" :active="active" />
    </span>
    <n-switch v-model:value="active" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false)
    }
  }
})
</script>
