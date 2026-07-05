<markdown>
# Use loading bar locally

You can set mount target of loading by `to` prop.
</markdown>

<script lang="ts" setup>
import { NButton, NSpace, useLoadingBar } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

// Define the LoadingBarTrigger component
const LoadingBarTrigger = defineComponent(() => {
  const loadingBar = useLoadingBar()
  return () => {
    return h(NSpace, null, {
      default: () => [
        h(
          NButton,
          { onClick: () => loadingBar.start() },
          { default: () => 'Start' }
        ),
        h(
          NButton,
          { onClick: () => loadingBar.finish() },
          { default: () => 'Finish' }
        )
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
