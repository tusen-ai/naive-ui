# 深度
为了搭配不同级的文字颜色，图标提供 `depth` 选项。
```html
<n-icon
  size="40"
  depth="primary"
>
  <cash-outline />
</n-icon>
<n-icon
  size="40"
  depth="secondary"
>
  <cash-outline />
</n-icon>
<n-icon
  size="40"
  depth="tertiary"
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