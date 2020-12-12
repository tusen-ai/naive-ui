# 图标

在按钮上使用图标。

```html
<n-space>
  <n-button>
    <template v-slot:icon>
      <cash-icon />
    </template>
    +100 元
  </n-button>
  <n-button icon-placement="right">
    <template v-slot:icon>
      <cash-icon />
    </template>
    +100 元
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
