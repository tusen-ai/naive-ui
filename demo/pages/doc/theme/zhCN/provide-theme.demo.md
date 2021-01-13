# 提供主题

使用 `n-config-provider` 来设定它全部的后代组件主题。

```html
<n-config-provider :unstable-theme="theme">
  <n-card>
    <n-space>
      <n-button @click="theme = darkTheme">深色</n-button>
      <n-button @click="theme = lightTheme">浅色</n-button>
    </n-space>
  </n-card>
</n-config-provider>
```

```js
import { ref } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'

export default {
  setup () {
    return {
      darkTheme,
      lightTheme,
      theme: ref(lightTheme)
    }
  }
}
```
