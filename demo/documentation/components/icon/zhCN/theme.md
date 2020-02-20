# 适配主题
Naive UI 提供一些简单的方法来自定义不同主题下的样式。
```html
<n-icon
  size="40"
  :themed-style="{
    dark: {
      fill: 'rgb(0, 128, 0)',
      stroke: 'rgb(0, 128, 0)'
    },
    light: {
      fill: 'rgb(0, 160, 0)',
      stroke: 'rgb(0, 160, 0)'
    }
  }"
>
  <cash-outline />
</n-icon>
```
```js
import cashOutline from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    cashOutline
  }
}
```