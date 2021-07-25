# Icon

Customize icon in empty.

```html
<n-empty description="Custom your icon">
  <template #icon>
    <n-icon>
      <ios-airplane />
    </n-icon>
  </template>
  <template #extra>
    <n-button size="small">Find Something New</n-button>
  </template>
</n-empty>
```

```js
import { IosAirplane } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    IosAirplane
  }
})
```
