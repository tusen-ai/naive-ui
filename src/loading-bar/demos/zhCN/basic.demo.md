# 基础用法

```html
<n-space>
  <n-button @click="handleStart"> 开始 </n-button>
  <n-button @click="handleFinish"> 结束 </n-button>
  <n-button @click="handleError"> 报个错 </n-button>
</n-space>
```

```js
import { useLoadingBar } from 'naive-ui'

export default {
  setup () {
    const loadingBar = useLoadingBar()
    return {
      handleStart () {
        loadingBar.start()
      },
      handleFinish () {
        loadingBar.finish()
      },
      handleError () {
        loadingBar.error()
      }
    }
  }
}
```
