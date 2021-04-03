# Custom Separator

Use separator prop to custom separator.

```html
<n-breadcrumb separator=">">
  <n-breadcrumb-item>
    <n-icon><md-cash /></n-icon> Home</n-breadcrumb-item
  >
  <n-breadcrumb-item
    ><n-icon><md-cash /></n-icon> Account</n-breadcrumb-item
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
