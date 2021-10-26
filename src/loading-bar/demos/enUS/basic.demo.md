# Basic

```html
<n-space>
  <n-button @click="handleStart"> start </n-button>
  <n-button @click="handleFinish" :disabled="disabled"> finish </n-button>
  <n-button @click="handleError"> error </n-button>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'
import { useLoadingBar } from 'naive-ui'

export default defineComponent({
  setup () {
    const loadingBar = useLoadingBar()
    const disabledRef = ref(true)
    return {
      disabled: disabledRef,
      handleStart () {
        loadingBar.start()
        disabledRef.value = false
      },
      handleFinish () {
        loadingBar.finish()
        disabledRef.value = true
      },
      handleError () {
        disabledRef.value = true
        loadingBar.error()
      }
    }
  }
})
```
