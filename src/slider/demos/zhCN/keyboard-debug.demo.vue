<markdown>
# 键盘事件
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(50),
      keyboard: ref(false)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-switch v-model:value="keyboard" />
    <n-slider v-model:value="value" :step="10" :keyboard="keyboard" />
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>
