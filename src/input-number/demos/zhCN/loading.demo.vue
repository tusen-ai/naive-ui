<markdown>
# 加载状态
</markdown>

<template>
  <n-space align="center">
    <n-input-number clearable :loading="loading" />
    <n-switch v-model:value="loading" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      loading: ref(false)
    }
  }
})
</script>
