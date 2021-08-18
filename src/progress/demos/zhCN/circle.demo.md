# 圈

进度可以是个圈，它支持 `default`、`info`、`success`、`warning` 和 `error` 的 `status`。

```html
<n-space>
  <n-progress type="circle" :percentage="percentage" />
  <n-progress type="circle" status="info" :percentage="percentage" />
  <n-progress type="circle" status="success" :percentage="percentage" />
  <n-progress type="circle" status="warning" :percentage="percentage" />
  <n-progress type="circle" status="error" :percentage="percentage" />
</n-space>
<n-space>
  <n-button @click="minus"> 减 10% </n-button>
  <n-button @click="add"> 加 10% </n-button>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const percentage = ref(0)

    const add = () => {
      percentage.value += 10
      if (percentage.value > 100) {
        percentage.value = 0
      }
    }

    const minus = () => {
      percentage.value -= 10
      if (percentage.value < 0) {
        percentage.value = 100
      }
    }

    return {
      percentage,
      add,
      minus
    }
  }
})
```
