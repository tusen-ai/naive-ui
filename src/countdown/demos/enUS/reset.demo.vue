<markdown>
# Reset
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CountdownInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const activeRef = ref(true)
    const countdownRef = ref<CountdownInst | null>()
    function handleReset () {
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
