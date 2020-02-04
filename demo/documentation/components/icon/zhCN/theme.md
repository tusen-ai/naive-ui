# 适配主题
Naive UI 提供一些简单的方法来自定义不同主题下的样式。
```html
<n-icon
  size="40"
  :themed-style="{
    dark: {
      fill: 'rgba(255, 0, 0, .5)'
    },
    light: {
      fill: 'rgba(0, 128, 0, .5)'
    }
  }"
>
  <md-cash />
</n-icon>
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash'

export default {
  components: {
    mdCash
  }
}
```