# 自定义分隔符

使用 separator prop 自定义分隔符。

```html
<n-breadcrumb separator=">">
  <n-breadcrumb-item>
    <n-icon><md-cash /></n-icon> 北京总行</n-breadcrumb-item
  >
  <n-breadcrumb-item
    ><n-icon><md-cash /></n-icon> 天津分行</n-breadcrumb-item
  >
  <n-breadcrumb-item
    ><n-icon><md-cash /></n-icon> 平山道支行</n-breadcrumb-item
  >
</n-breadcrumb>
```

```js
import { MdCash } from '@vicons/ionicons4'

export default {
  components: {
    MdCash
  }
}
```
