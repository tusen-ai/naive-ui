<markdown>
# 带背景色的图标

有的时候加个背景显得没那么单调。
</markdown>

<template>
  <n-icon-wrapper :size="24" :border-radius="10" color="#ef4444">
    <n-icon :size="18" :component="AlertOutline" />
  </n-icon-wrapper>
</template>

<script lang="ts">
import { AlertOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      AlertOutline
    }
  }
})
</script>
