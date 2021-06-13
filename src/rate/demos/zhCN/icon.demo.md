# 图标

使用自定义图标。

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
