# Shape

Button has different shapes.

```html
<n-space>
  <n-button circle>
    <template #icon>
      <n-icon><cash-icon /></n-icon>
    </template>
  </n-button>
  <n-button round>Round</n-button>
  <n-button>Rect</n-button>
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
