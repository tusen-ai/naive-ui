<markdown>
# 自定义位置偏移
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      value: ref(5),
      offset: [-17, 17] as const
    }
  }
})
</script>

<template>
  <n-badge :value="value" :max="15" :offset="offset">
    <n-avatar />
  </n-badge>
</template>
