# Theme

Set theme of inner components of `n-config-provider`.

```html
<n-config-provider :unstable-theme="theme">
  <n-card>
    <n-space>
      <n-button @click="theme = darkTheme">Dark</n-button>
      <n-button @click="theme = lightTheme">Light</n-button>
    </n-space>
  </n-card>
</n-config-provider>
```

```js
import { ref } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'

export default {
  setup () {
    return {
      darkTheme,
      lightTheme,
      theme: ref(lightTheme)
    }
  }
}
```
