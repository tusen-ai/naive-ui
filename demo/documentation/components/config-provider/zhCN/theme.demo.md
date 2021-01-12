# 主题

设置 `n-config-provider` 内部组件的主题。

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
