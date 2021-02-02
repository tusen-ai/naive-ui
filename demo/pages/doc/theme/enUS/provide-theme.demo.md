# Provide Theme

Use `n-config-provider` to set the theme of all its descedant components.

```html
<n-config-provider :theme="theme">
  <n-card>
    <n-space>
      <n-button @click="theme = darkTheme">Dark</n-button>
      <n-button @click="theme = null">Light</n-button>
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
