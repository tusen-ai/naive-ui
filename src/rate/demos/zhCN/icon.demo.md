# 图标

默认插槽的内容会被用作图标。

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
