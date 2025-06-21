<markdown>
# 精度

知道的太多对你没有好处。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)
</script>

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
