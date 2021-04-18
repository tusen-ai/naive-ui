# Scroll

You can easily make log scroll to top or bottom. Also you can make the scroll action silent (don't trigger events of Log in this scroll action).

```html
<n-space vertical>
  <n-button-group>
    <n-button @click="scrollTo({ position: 'bottom', slient: false })"
      >Scroll To Bottom</n-button
    >
    <n-button @click="scrollTo({ position: 'bottom', slient: true })"
      >Scroll To Bottom (silent)</n-button
    >
    <n-button @click="scrollTo({ position: 'top', slient: false })"
      >Scroll To Top</n-button
    >
    <n-button @click="scrollTo({ position: 'top', slient: true })"
      >Scroll To Top (silent)</n-button
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
