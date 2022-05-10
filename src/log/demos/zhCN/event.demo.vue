<markdown>
# 事件

Log 有 `require-more`、`reach-top` 和 `reach-bottom` 事件。需要注意的是即使 Log 已经滚到了头或者尾，你继续滚动鼠标的时候，`require-more` 还是会被触发，而 `reach-xxx` 并不会。如果你不需要这种特性，可以使用 `reach-top` 或者 `reach-bottom`。
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
