# useThemeVars

Naive UI provide `useThemeVars`. It contains common theme variables.

```html
<pre style="overflow: auto;">{{ themeVars }}</pre>
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
