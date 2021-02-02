# Basic

It is very useful to create themed component.

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = darkTheme">Dark</n-button>
    <n-button @click="theme = undefined">Light</n-button>
  </n-space>
  <n-config-provider :theme="theme">
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
import { darkTheme } from 'naive-ui'

export default {
  setup () {
    return {
      darkTheme,
      theme: ref()
    }
  }
}
```
