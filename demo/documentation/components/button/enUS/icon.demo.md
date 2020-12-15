# Icon

Use icon in button.

```html
<n-space>
  <n-button>
    <template #icon>
      <cash-icon />
    </template>
    +100$
  </n-button>
  <n-button icon-placement="right">
    <template #icon>
      <cash-icon />
    </template>
    +100$
  </n-button>
</n-space>
```

```js
import { CashOutline as CashIcon } from '@vicons/ionicons-v5'

export default {
  components: {
    CashIcon
  }
}
```
