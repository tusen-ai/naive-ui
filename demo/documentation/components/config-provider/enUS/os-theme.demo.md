# Use OS Theme
Naive UI provides `useOsTheme` to get the current theme of your OS.

```html
<n-config-provider :theme="theme">
  <n-card>
    Your current system theme is {{ theme }}.
  </n-card>
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

