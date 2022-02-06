<markdown>
# 加载状态

`input` 支持加载状态。
</markdown>

<template>
  <n-input
    v-model:value="value"
    type="text"
    placeholder="基本的 Input"
    loading
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
