# Basic

It is very useful to create themed component.

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = darkTheme">Dark</n-button>
    <n-button @click="theme = lightTheme">Light</n-button>
  </n-space>
  <n-config-provider :unstable-theme="theme">
    <n-card>
      <n-el
        tag="span"
        style="color: var(--primary-color); transition: .3s var(--cubic-bezier-ease-in-out);"
      >
        I am a Span.
      </n-el>
    </n-card>
  </n-config-provider>
</n-space>
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
