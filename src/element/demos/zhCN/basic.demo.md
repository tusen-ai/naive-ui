# 基础

创建特定主题的组件十分管用。

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = darkTheme">深色</n-button>
    <n-button @click="theme = null">浅色</n-button>
  </n-space>
  <n-config-provider :theme="theme">
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
