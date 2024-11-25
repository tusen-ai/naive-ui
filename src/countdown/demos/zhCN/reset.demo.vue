<markdown>
# 重置

青春是挽不回的水，转眼消失在指尖。
</markdown>

<script lang="ts">
import type { CountdownInst } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const activeRef = ref(true)
    const countdownRef = ref<CountdownInst | null>()
    function handleReset() {
      countdownRef.value?.reset()
    }
    return {
      active: activeRef,
      countdown: countdownRef,
      handleReset
    }
  }
})
</script>

<template>
  <n-space>
    <span style="font-variant-numeric: tabular-nums">
      <n-countdown ref="countdown" :duration="86400000" :active="active" />
    </span>
    <n-button size="tiny" @click="handleReset">
      重置
    </n-button>
    <n-switch v-model:value="active" />
  </n-space>
</template>
