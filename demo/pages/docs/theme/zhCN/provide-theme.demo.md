# 提供主题

使用 `n-config-provider` 来设定它全部的后代组件主题。

```html
<n-config-provider :theme="theme">
  <n-card>
    <n-space>
      <n-button @click="theme = darkTheme">深色</n-button>
      <n-button @click="theme = null">浅色</n-button>
    </n-space>
  </n-card>
</n-config-provider>
```

```js
import { defineComponent, ref } from 'vue'
import { darkTheme } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      darkTheme,
      theme: ref(null)
    }
  }
})
```
