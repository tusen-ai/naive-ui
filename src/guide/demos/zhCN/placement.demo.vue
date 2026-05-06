<markdown>
# 位置

可以全局或为每一步单独设置位置。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: '上方',
          content: '面板可以展示在目标上方。',
          target: '#guide-placement-top',
          placement: 'top'
        },
        {
          title: '右侧',
          content: '也可以展示在目标右侧。',
          target: '#guide-placement-right',
          placement: 'right'
        },
        {
          title: '下方',
          content: '下方是默认位置。',
          target: '#guide-placement-bottom',
          placement: 'bottom'
        },
        {
          title: '左侧',
          content: '可以为每一步单独设置 placement。',
          target: '#guide-placement-left',
          placement: 'left'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-placement-top">
      上
    </n-button>
    <n-button id="guide-placement-right">
      右
    </n-button>
    <n-button id="guide-placement-bottom">
      下
    </n-button>
    <n-button id="guide-placement-left">
      左
    </n-button>
    <n-button @click="show = true">
      开始引导
    </n-button>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" />
</template>
