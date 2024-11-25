# useThemeVars

Naive UI provides `useThemeVars`. It contains common theme variables.

```html
<pre style="overflow: auto;">{{ themeVars }}</pre>
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
