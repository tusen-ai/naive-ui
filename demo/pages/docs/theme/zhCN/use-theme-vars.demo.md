# useThemeVars

Naive UI 提供 `useThemeVars`，它包含了常见的主题变量。

```html
<pre style="overflow: auto;">{{themeVars}}</pre>
```

```js
import { defineComponent } from 'vue'
import { useThemeVars } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      themeVars: useThemeVars()
    }
  }
})
```
