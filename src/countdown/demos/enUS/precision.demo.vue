<markdown>
# Precision

🧐🧐🧐
</markdown>

<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" :precision="1" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" :precision="2" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <n-countdown :duration="3600 * 1000" :active="active" :precision="3" />
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
