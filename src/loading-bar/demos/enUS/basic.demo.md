# Basic

```html
<n-space>
  <n-button @click="handleStart"> start </n-button>
  <n-button @click="handleFinish"> finish </n-button>
  <n-button @click="handleError"> error </n-button>
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
