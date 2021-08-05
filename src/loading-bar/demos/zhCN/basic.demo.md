# 基础用法

```html
<n-space>
  <n-button @click="handleStart"> 开始 </n-button>
  <n-button @click="handleFinish" :disabled="disabled"> 结束 </n-button>
  <n-button @click="handleError"> 报个错 </n-button>
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
