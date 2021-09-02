# 高亮

在你使用高亮之前，请看本页开始的注意事项，那些对于确保这个例子按预期展示是很重要的。

```html
<n-log
  :log="log"
  @require-top="handlerequireTop"
  @require-bottom="handlerequireBottom"
  :loading="loading"
  language="naive-log"
  trim
/>
```

```js
import { defineComponent, ref } from 'vue'

function log () {
  const l = []
  for (let i = 0; i < 40; ++i) {
    l.push(Math.random().toString(16))
  }
  return l.join('\n') + '\n'
}

export default defineComponent({
  setup () {
    const loadingRef = ref(false)
    const logRef = ref(log())

    return {
      loading: loadingRef,
      log: logRef,
      clear () {
        logRef.value = ''
      },
      handlerequireTop () {
        if (loadingRef.value) return
        loadingRef.value = true
        setTimeout(() => {
          logRef.value = log() + logRef.value
          loadingRef.value = false
        }, 1000)
      },
      handlerequireBottom () {
        if (loadingRef.value) return
        loadingRef.value = true
        setTimeout(() => {
          logRef.value = logRef.value + log()
          loadingRef.value = false
        }, 1000)
      }
    }
  }
})
```
