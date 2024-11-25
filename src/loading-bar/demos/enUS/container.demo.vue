<markdown>
# Use loading bar locally

You can set mount target of loading by `to` prop.
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
