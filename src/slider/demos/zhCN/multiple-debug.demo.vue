<markdown>
# 多于两个滑块

虽然我也不知道有啥用，但是这看起来很屌。
</markdown>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" range :step="1" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([50, 70, 80, 90])
    }
  }
})
</script>
