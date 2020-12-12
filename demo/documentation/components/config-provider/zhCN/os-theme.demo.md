# 使用操作系统主题

Naive UI 提供 `useOsTheme` 来获取当前操作系统的主题。

```html
<n-config-provider :theme="theme">
  <n-card> 当前操作系统的主题是 {{ theme }}。 </n-card>
</n-config-provider>
```

```js
import { useOsTheme } from 'naive-ui'

export default {
  setup () {
    return {
      theme: useOsTheme()
    }
  }
}
```
