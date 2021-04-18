# 滚动

你可以很简单的让 Log 滚到顶部或者底部。同时你可以控制这个滚动操作是否发出事件。

```html
<n-space vertical>
  <n-button-group>
    <n-button @click="scrollTo({ position: 'bottom', slient: false })"
      >滚动到底部</n-button
    >
    <n-button @click="scrollTo({ position: 'bottom', slient: true })"
      >滚动到底部（无事件）</n-button
    >
    <n-button @click="scrollTo({ position: 'top', slient: false })"
      >滚动到顶部</n-button
    >
    <n-button @click="scrollTo({ position: 'top', slient: true })"
      >滚动到顶部（无事件）</n-button
    >
  </n-button-group>
  <n-log
    ref="logInstRef"
    :log="log"
    @require-more="handleRequireMore"
    @reach-top="handleReachTop"
    @reach-bottom="handleReachBottom"
    :loading="loading"
    trim
  />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

function log () {
  const l = []
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
    const logInstRef = ref(null)
    return {
      logInstRef,
      loading: false,
      log: log(),
      clear () {
        logRef.value = ''
      },
      handleRequireMore (from) {
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
      },
      scrollTo (...args) {
        logInstRef.value.scrollTo(...args)
      }
    }
  }
})
```
