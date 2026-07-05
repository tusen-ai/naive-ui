<markdown>
# 无遮罩

可以在不遮罩页面的情况下展示引导。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: '无遮罩',
          content: '当页面不需要被遮罩覆盖时，可以设置 show-mask=false。',
          target: '#guide-no-mask-target'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-no-mask-target">
      目标
    </n-button>
    <n-button @click="show = true">
      开始引导
    </n-button>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" :show-mask="false" />
</template>
