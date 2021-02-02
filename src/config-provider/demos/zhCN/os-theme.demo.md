# 使用操作系统主题

Naive UI 提供 `useOsTheme` 来获取当前操作系统的主题。

```html
<n-config-provider :theme="theme">
  <n-card> 当前操作系统的主题是 {{ osTheme }}。 </n-card>
</n-config-provider>
```

```js
import { computed } from 'vue'
import { useOsTheme, darkTheme } from 'naive-ui'

export default {
  setup () {
    const osThemeRef = useOsTheme()
    return {
      theme: computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
      osTheme: osThemeRef
    }
  }
}
```
