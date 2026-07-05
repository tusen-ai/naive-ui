<markdown>
# 受控

使用 v-model 控制显示状态和当前步骤。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      current: ref(1),
      steps: [
        {
          title: '受控步骤',
          content: '通过 v-model:current 控制当前步骤。',
          target: '#guide-controlled-first'
        },
        {
          title: '保持同步',
          content: '外部按钮可以切换引导步骤。',
          target: '#guide-controlled-second'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button id="guide-controlled-first">
        第一个目标
      </n-button>
      <n-button id="guide-controlled-second">
        第二个目标
      </n-button>
    </n-space>
    <n-space>
      <n-button @click="show = true">
        开始
      </n-button>
      <n-button @click="current = 1">
        到第一步
      </n-button>
      <n-button @click="current = 2">
        到第二步
      </n-button>
    </n-space>
  </n-space>
  <n-guide v-model:show="show" v-model:current="current" :steps="steps" />
</template>
