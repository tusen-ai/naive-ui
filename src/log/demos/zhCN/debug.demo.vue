<markdown>
# Debug
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

function log() {
  const l: string[] = []
  for (let i = 0; i < 40; ++i) {
    l.push(Math.random().toString(16))
  }
  return `${l.join('\n')}\n`
}

export default defineComponent({
  setup() {
    const message = useMessage()
    const loadingRef = ref(false)
    const logRef = ref(log())
    const logInstRef = ref()
    return {
      loading: loadingRef,
      log: logRef,
      clear() {
        logRef.value = ''
      },
      handleRequireMore(from: 'top' | 'bottom') {
        if (loadingRef.value)
          return
        loadingRef.value = true
        setTimeout(() => {
          if (from === 'top') {
            logRef.value = log() + logRef.value
          }
          else if (from === 'bottom') {
            logRef.value = logRef.value + log()
          }
          loadingRef.value = false
        }, 1000)
      },
      logInstRef,
      handleReachTop() {
        message.info('Reach Top')
      },
      handleReachBottom() {
        message.info('Reach Bottom')
      },
      scrollTo(options: { position: 'bottom' | 'top', silent: boolean }) {
        logInstRef.value?.scrollTo(options)
      }
    }
  }
})
</script>

<template>
  <n-card
    title="Random String Logs"
    :segmented="{
      content: true,
    }"
  >
    <n-button-group>
      <n-button @click="scrollTo({ position: 'bottom', silent: false })">
        滚动到底部
      </n-button>
      <n-button @click="scrollTo({ position: 'bottom', silent: true })">
        滚动到底部（无事件）
      </n-button>
      <n-button @click="scrollTo({ position: 'top', silent: false })">
        滚动到顶部
      </n-button>
      <n-button @click="scrollTo({ position: 'top', silent: true })">
        滚动到顶部（无事件）
      </n-button>
    </n-button-group>
    <n-log
      ref="logInstRef"
      style="margin-top: -12px; margin-bottom: -12px"
      :log="log"
      :loading="loading"
      trim
      @require-more="handleRequireMore"
      @reach-top="handleReachTop"
      @reach-bottom="handleReachBottom"
    />
    <template #action>
      <n-button @click="clear">
        Clear
      </n-button>
    </template>
  </n-card>
</template>
