<markdown>
# 在局部使用进度条

你可以设定 `to` 来控制进度条的挂载位置
</markdown>

<script lang="ts" setup>
import { NButton, NSpace, useLoadingBar } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

// 定义 LoadingBarTrigger 组件
const LoadingBarTrigger = defineComponent(() => {
  const loadingBar = useLoadingBar()
  return () => {
    return h(NSpace, null, {
      default: () => [
        h(NButton, { onClick: () => loadingBar.start() }, () => 'Start'),
        h(NButton, { onClick: () => loadingBar.finish() }, () => 'Finish')
      ]
    })
  }
})

const loadingBarTargetRef = ref<undefined | HTMLElement>(undefined)
</script>

<template>
  <n-loading-bar-provider
    :to="loadingBarTargetRef"
    container-style="position: absolute;"
  >
    <div
      ref="loadingBarTargetRef"
      style="
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: var(--n-border-radius);
        overflow: hidden;
        pointer-events: none;
      "
    />
    <LoadingBarTrigger />
  </n-loading-bar-provider>
</template>
