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
    function handleStart () {
      loadingBar.start()
      disabledRef.value = false
    }
    function handleFinish () {
      loadingBar.finish()
      disabledRef.value = true
    }
    function handleError () {
      loadingBar.error()
    }
    return {
      disabled: disabledRef,
      handleStart,
      handleFinish,
      handleError
    }
  }
})
```
