<markdown>
# 自定义操作

通过 actions 插槽自定义引导操作区。
</markdown>

<script lang="ts">
import type { GuideInst } from '../../index'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      guideRef: ref<GuideInst | null>(null),
      steps: [
        {
          title: '自定义操作',
          content: '可以通过 actions 插槽完全自定义操作区。',
          target: '#guide-custom-action'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-custom-action">
      目标
    </n-button>
    <n-button @click="show = true">
      开始引导
    </n-button>
  </n-space>
  <n-guide ref="guideRef" v-model:show="show" :steps="steps">
    <template #actions="{ current, total }">
      <n-space>
        <n-button size="small" text @click="show = false">
          暂不查看
        </n-button>
        <n-button
          size="small"
          type="primary"
          @click="current === total ? guideRef?.finish() : guideRef?.next()"
        >
          {{ current === total ? '全部完成' : '继续' }}
        </n-button>
      </n-space>
    </template>
  </n-guide>
</template>
