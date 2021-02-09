# 使用带主题的样式（deprecated)

一些组件有 `themed-style` 属性来帮你调整这个组件最外层元素的样式，对于一些简单的组件，这是很有效的方式。

```html
<n-space vertical>
  <n-space>
    <n-button @click="theme = 'dark'">深色</n-button>
    <n-button @click="theme = 'light'">浅色</n-button>
  </n-space>
  <n-config-provider :theme="theme">
    <n-card>
      <n-icon
        size="40"
        :themed-style="{
          dark: {
            fill: 'aquamarine'
          },
          light: {
            fill: 'green'
          }
        }"
      >
        <md-cash />
      </n-icon>
    </n-card>
  </n-config-provider>
</n-space>
```

```js
import { MdCash, MdContacts, IosContacts } from '@vicons/ionicons4'

export default {
  components: {
    MdCash,
    MdContacts,
    IosContacts
  },
  data () {
    return {
      theme: 'dark'
    }
  }
}
```
