<markdown>
# 带背景色的图标

有的时候加个背景显得没那么单调。
</markdown>

<template>
  <n-icon-wrapper :size="24" :border-radius="10">
    <n-icon :size="18" :component="Checkmark16Filled" />
  </n-icon-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Checkmark16Filled from '@vicons/fluent/Checkmark16Filled'

export default defineComponent({
  setup () {
    return {
      Checkmark16Filled
    }
  }
})
</script>
