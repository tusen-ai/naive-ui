<markdown>
# Reset
</markdown>

<script lang="ts" setup>
import type { CountdownInst } from 'naive-ui'
import { ref } from 'vue'

const active = ref(true)
const countdown = ref<CountdownInst | null>(null)

function handleReset() {
  countdown.value?.reset()
}
</script>

<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums">
      <n-countdown ref="countdown" :duration="86400000" :active="active" />
    </span>
    <n-button size="tiny" @click="handleReset">
      Reset
    </n-button>
    <n-switch v-model:value="active" />
  </n-space>
</template>
