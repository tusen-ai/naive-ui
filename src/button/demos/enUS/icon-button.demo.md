# Use Icon as Button

Sometimes you may want to use icon as button and customize its size. You can use `text` prop and `font-size` style to set it.

```html
<n-button text style="font-size: 24px;">
  <n-icon>
    <cash-icon />
  </n-icon>
</n-button>
```

```js
import { defineComponent } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    CashIcon
  }
})
```
