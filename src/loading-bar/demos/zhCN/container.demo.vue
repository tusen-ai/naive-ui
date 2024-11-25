<markdown>
# 在局部使用进度条

你可以设定 `to` 来控制进度条的挂载位置
</markdown>

<script lang="ts">
import { NButton, NSpace, useLoadingBar } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  components: {
    LoadingBarTrigger: defineComponent({
      setup() {
        const loadingBar = useLoadingBar()
        return () => {
          return h(NSpace, null, {
            default: () => [
              h(NButton, { onClick: () => loadingBar.start() }, () => 'Start'),
              h(NButton, { onClick: () => loadingBar.finish() }, () => 'Finish')
            ]
          })
        }
      }
    })
  },
  setup() {
    return {
      loadingBarTargetRef: ref<undefined | HTMLElement>(undefined)
    }
  }
})
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
        inset: 0;
        border-radius: var(--n-border-radius);
        overflow: hidden;
        pointer-events: none;
      "
    />
    <LoadingBarTrigger />
  </n-loading-bar-provider>
</template>
