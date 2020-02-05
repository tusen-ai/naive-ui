# 使用带主题的样式
一些组件有 `themed-style` 属性来帮你调整这个组件最外层元素的样式，对于一些简单的组件，这是很有效的方式。
```html
<n-icon
  size="40"
  :themed-style="{
    dark: {
      fill: 'yellow'
    },
    light: {
      fill: 'red'
    }
  }"
>
  <md-cash />
</n-icon>
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash'
import mdContacts from 'naive-ui/lib/icons/md-contacts'
import iosContacts from 'naive-ui/lib/icons/ios-contacts'

export default {
  components: {
    mdCash,
    mdContacts,
    iosContacts
  }
}
```
