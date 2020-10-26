# 使用带主题的样式
一些组件有 `themed-style` 属性来帮你调整这个组件最外层元素的样式，对于一些简单的组件，这是很有效的方式。
```html
<div>
  <n-button @click="theme = 'dark'">深色</n-button>
  <n-button @click="theme = 'light'">浅色</n-button>
</div>
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
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash.vue'
import mdContacts from 'naive-ui/lib/icons/md-contacts.vue'
import iosContacts from 'naive-ui/lib/icons/ios-contacts.vue'

export default {
  components: {
    mdCash,
    mdContacts,
    iosContacts
  },
  data () {
    return {
      theme: 'dark'
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```