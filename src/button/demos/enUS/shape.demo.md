# Shape

Buttons can have different shapes.

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
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
```
