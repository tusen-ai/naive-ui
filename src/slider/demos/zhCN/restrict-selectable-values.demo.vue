<markdown>
# 限制可选值

设定 `step="mark"` 将可选值限制为标记属性所提供的值。
</markdown>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" :marks="marks" step="mark" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      marks: {
        0: '0°C',
        20: '20°C',
        37: '37°C',
        100: '100°C'
      }
    }
  }
})
</script>
