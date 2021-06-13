# Icon

The content in default slot will be used as icon.

```html
<n-space>
  <n-rate>
    <n-icon size='20'>
      <cash-icon />
    </n-icon>
  </n-rate>
</n-space>
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
