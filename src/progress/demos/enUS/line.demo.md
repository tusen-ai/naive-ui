# Line

In fact, progress of line type don't need four different styles. However, since UI has designed it, I finally implemented them all. It also support `default`, `info`, `success`, `warning` or `error` status.

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
    <n-button @click="minus"> Minus 10% </n-button>
    <n-button @click="add"> Add 10% </n-button>
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
