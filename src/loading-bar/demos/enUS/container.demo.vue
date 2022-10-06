<markdown>
# Use loading bar locally

You can set mount target of loading by `to` prop.
</markdown>

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
    <loading-bar-trigger />
  </n-loading-bar-provider>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { NButton } from '../../../button'
import { NSpace } from '../../../space'
import { useLoadingBar } from '../../src/use-loading-bar'

export default defineComponent({
  components: {
    LoadingBarTrigger: defineComponent({
      setup () {
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
  setup () {
    return {
      loadingBarTargetRef: ref<undefined | HTMLElement>(undefined)
    }
  }
})
</script>
