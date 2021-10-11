# Icon

The content of the default slot will be used as the icon.

```html
<n-rate>
  <n-icon size="20">
    <cash-icon />
  </n-icon>
</n-rate>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
```
