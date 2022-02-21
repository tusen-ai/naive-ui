<markdown>
# 尺寸

有 `small`、`medium` 和 `large` 尺寸。
</markdown>

<template>
  <n-space vertical>
    <n-date-picker v-model:value="timestamp" size="small" type="date" />
    <n-date-picker v-model:value="timestamp" size="medium" type="date" />
    <n-date-picker v-model:value="timestamp" size="large" type="date" />
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
