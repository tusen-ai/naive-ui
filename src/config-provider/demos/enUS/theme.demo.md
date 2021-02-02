# Theme

Set theme of inner components of `n-config-provider`.

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
