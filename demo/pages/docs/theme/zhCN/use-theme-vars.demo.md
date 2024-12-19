# useThemeVars

Naive UI 提供 `useThemeVars`，它包含了常见的主题变量。

```html
<pre style="overflow: auto;">{{themeVars}}</pre>
```

```js
import { useThemeVars } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      themeVars: useThemeVars()
    }
  }
})
```
