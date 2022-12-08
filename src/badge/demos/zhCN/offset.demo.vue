<markdown>
  # 自定义位置偏移
  </markdown>

<template>
  <n-badge :value="value" :offset="[10, 10]">
    <n-avatar />
  </n-badge>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(5)
    }
  }
})
</script>
