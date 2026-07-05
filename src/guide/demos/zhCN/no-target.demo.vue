<markdown>
# 无目标

没有 target 的步骤会显示在视口中心附近。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: '无目标',
          content: '没有 target 的步骤会显示在视口中心附近。'
        }
      ]
    }
  }
})
</script>

<template>
  <n-button @click="show = true">
    开始引导
  </n-button>
  <n-guide v-model:show="show" :steps="steps" />
</template>
