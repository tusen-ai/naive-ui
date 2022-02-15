<markdown>
# 倒转

设定 `reverse` 可以将轨道倒转过来。
</markdown>

<template>
  <n-space vertical>
    <n-slider v-model:value="value" :step="10" reverse />
    <n-input-number v-model:value="value" size="small" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
</script>
