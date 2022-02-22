<markdown>
# 尺寸

可以是 `small`、`medium` 或 `large` 尺寸。
</markdown>
<template>
  <n-space vertical>
    <n-time-picker v-model:value="timestamp" size="small" />
    <n-time-picker v-model:value="timestamp" size="medium" />
    <n-time-picker v-model:value="timestamp" size="large" />
  </n-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(null)
    }
  }
})
</script>
