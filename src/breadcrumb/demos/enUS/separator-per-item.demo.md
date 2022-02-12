# Custom separator by item

Use separator prop or separator slot to custom separator of an item. When both are present, separator slot will be used.

```html
<n-breadcrumb>
  <n-breadcrumb-item separator=">">
    <n-icon><md-cash /></n-icon> Home
  </n-breadcrumb-item>
  <n-breadcrumb-item>
    <n-icon><md-cash /></n-icon> Account
    <template #separator>~</template>
  </n-breadcrumb-item>
  <n-breadcrumb-item>
    <n-icon><md-cash /></n-icon> Category
  </n-breadcrumb-item>
</n-breadcrumb>
```

```js
import { defineComponent } from 'vue'
import { MdCash } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdCash
  }
})
```
