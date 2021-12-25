# 滚动到最新

当日志不断增加是总是滚动到最新。

```html
<n-space vertical>
  <n-button @click="handleClick">添加数据</n-button>
  <n-log ref="logInst" :log="log" language="naive-log" trim />
</n-space>
```

```js
import { defineComponent, ref, watchEffect, onMounted, nextTick } from 'vue'

function log () {
  const l = []
  for (let i = 0; i < 40; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default defineComponent({
  setup () {
    const logRef = ref(log())
    const logInstRef = ref(null)
    const startRef = ref(false)
    const timerRef = ref(null)
    const handleClick = () => {
      startRef.value = !startRef.value
      if (startRef.value) {
        timerRef.value = setInterval(() => {
          logRef.value = logRef.value + log()
        }, 1000)
      } else if (timerRef.value) {
        clearInterval(timerRef.value)
        timerRef.value = null
      }
    }
    onMounted(() => {
      watchEffect(() => {
        if (logRef.value) {
          nextTick(() => {
            logInstRef.value.scrollTo({ position: 'bottom', slient: true })
          })
        }
      })
    })

    return {
      log: logRef,
      logInst: logInstRef,
      handleClick
    }
  }
})
```
