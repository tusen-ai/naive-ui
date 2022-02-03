<markdown>
# Event

Log has `require-more`, `reach-top` and `reach-bottom` event. Note that even if logs are scrolled to top or bottom, when you wheel to the same direction, `require-more` will still be triggered while `reach-xxx` will not. If you don't want to trigger handler when logs are at top or bottom. Use `reach-top` or `reach-bottom` instead.
</markdown>

<template>
  <n-log
    :log="log"
    :loading="loading"
    trim
    @require-more="handleRequireMore"
    @reach-top="handleReachTop"
    @reach-bottom="handleReachBottom"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

function log () {
  const l: string[] = []
  for (let i = 0; i < 10; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default defineComponent({
  setup () {
    const message = useMessage()
    const loadingRef = ref(false)
    const logRef = ref(log())
    return {
      loading: false,
      log: log(),
      handleRequireMore (from: 'top' | 'bottom') {
        message.info('Require More from ' + from)
        if (loadingRef.value) return
        loadingRef.value = true
        setTimeout(() => {
          if (from === 'top') {
            logRef.value = log() + logRef.value
          } else if (from === 'bottom') {
            logRef.value = logRef.value + log()
          }
          loadingRef.value = false
        }, 1000)
      },
      handleReachTop () {
        message.info('Reach Top')
      },
      handleReachBottom () {
        message.info('Reach Bottom')
      }
    }
  }
})
</script>
