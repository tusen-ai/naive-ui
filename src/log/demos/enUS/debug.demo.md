# Debug

```html
<n-card
  title="Random String Logs"
  :segmented="{
  header: 'soft',
  content: 'hard'
}"
>
  <n-log
    style="margin-top: -12px; margin-bottom: -12px;"
    :log="log"
    @require-more="handleRequireMore"
    :loading="loading"
    trim
  />
  <template #action>
    <n-button @click="clear">Clear</n-button>
  </template>
</n-card>
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
      handleRequireMore (from) {
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
      }
    }
  }
})
```
