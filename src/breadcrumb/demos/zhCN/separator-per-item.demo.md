# 自定义每项分隔符

使用 separator prop 或 separator slot 自定义每一项的分隔符。

```html
<n-breadcrumb>
  <n-breadcrumb-item separator=">">
    <n-icon><md-cash /></n-icon> 北京总行</n-breadcrumb-item
  >
  <n-breadcrumb-item
    ><n-icon><md-cash /></n-icon> 天津分行<template #separator
      >~</template
    ></n-breadcrumb-item
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
