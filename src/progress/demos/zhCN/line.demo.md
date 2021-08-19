# 线型

事实上线型的进度条不需要这么多种样子，但是既然 UI 画了，我也就实现了。它支持 `default`、`info`、`success`、`warning` 和 `error` 的 `status`。

```html
<n-space vertical>
  <n-progress type="line" :percentage="percentageRef" :show-indicator="false" />
  <n-progress type="line" :percentage="percentageRef" />
  <n-progress
    type="line"
    :percentage="percentageRef"
    :indicator-placement="'inside'"
  />
  <n-progress
    type="line"
    status="info"
    :percentage="percentageRef"
    :show-indicator="false"
  />
  <n-progress type="line" status="info" :percentage="percentageRef" />
  <n-progress
    type="line"
    status="info"
    :percentage="percentageRef"
    :indicator-placement="'inside'"
  />
  <n-progress
    type="line"
    status="success"
    :percentage="percentageRef"
    :show-indicator="false"
  />
  <n-progress type="line" status="success" :percentage="percentageRef" />
  <n-progress
    type="line"
    status="success"
    :percentage="percentageRef"
    :indicator-placement="'inside'"
  />
  <n-progress
    type="line"
    status="warning"
    :percentage="percentageRef"
    :show-indicator="false"
  />
  <n-progress type="line" status="warning" :percentage="percentageRef" />
  <n-progress
    type="line"
    status="warning"
    :percentage="percentageRef"
    :indicator-placement="'inside'"
  />
  <n-progress
    type="line"
    status="error"
    :percentage="percentageRef"
    :show-indicator="false"
  />
  <n-progress type="line" status="error" :percentage="percentageRef" />
  <n-progress
    type="line"
    status="error"
    :percentage="percentageRef"
    :indicator-placement="'inside'"
  />
  <n-space>
    <n-button @click="minus"> 减 10% </n-button>
    <n-button @click="add"> 加 10% </n-button>
  </n-space>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const percentageRef = ref(0)

    const add = () => {
      percentageRef.value += 10
      if (percentageRef.value > 100) {
        percentageRef.value = 0
      }
    }

    const minus = () => {
      percentageRef.value -= 10
      if (percentageRef.value < 0) {
        percentageRef.value = 100
      }
    }

    return {
      percentageRef,
      add,
      minus
    }
  }
})
```
