# 主题

设置 `n-config-provider` 内部组件的主题。

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
import { ref } from 'vue'
import { darkTheme } from 'naive-ui'

export default {
  setup () {
    return {
      darkTheme,
      theme: ref(null)
    }
  }
}
```
