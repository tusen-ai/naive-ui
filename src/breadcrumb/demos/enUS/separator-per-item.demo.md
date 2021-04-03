# Custom Separator by Item

Use separator prop or separator slot to custom separator of an item.

```html
<n-breadcrumb>
  <n-breadcrumb-item separator=">">
    <n-icon><md-cash /></n-icon> Home</n-breadcrumb-item
  >
  <n-breadcrumb-item
    ><n-icon><md-cash /></n-icon> Account<template #separator
      >~</template
    ></n-breadcrumb-item
  >
  <n-breadcrumb-item
    ><n-icon><md-cash /></n-icon> Category</n-breadcrumb-item
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
