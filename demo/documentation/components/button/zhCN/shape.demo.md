# 形状

按钮拥有不同的形状。

```html
<n-space>
  <n-button circle>
    <template #icon>
      <cash-icon />
    </template>
  </n-button>
  <n-button round>圆角</n-button>
  <n-button>方</n-button>
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
