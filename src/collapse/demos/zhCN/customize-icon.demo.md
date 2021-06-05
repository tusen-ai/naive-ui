# 自定义图标

```html
<n-collapse>
  <template #arrow>
    <n-icon>
      <cash-icon />
    </n-icon>
  </template>
  <n-collapse-item title="青铜" name="1">
    <div>可以</div>
  </n-collapse-item>
  <n-collapse-item title="白银" name="2">
    <div>很好</div>
  </n-collapse-item>
  <n-collapse-item title="黄金" name="3">
    <div>真棒</div>
  </n-collapse-item>
</n-collapse>
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
