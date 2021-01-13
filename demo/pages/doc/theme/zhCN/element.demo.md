# 使用元素组件

Naive UI 提供 `n-element` 组件，参考 [Element](n-element)。

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = darkTheme">深色</n-button>
    <n-button @click="theme = lightTheme">浅色</n-button>
  </n-space>
  <n-config-provider :unstable-theme="theme">
    <n-card>
      <n-el
        tag="span"
        style="color: var(--primary-color); transition: .3s var(--cubic-bezier-ease-in-out);"
      >
        我是个 span 标签
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
