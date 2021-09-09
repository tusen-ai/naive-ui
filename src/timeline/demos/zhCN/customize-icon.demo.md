# 自定义图标

```html
<n-timeline :icon-size="20">
  <n-timeline-item color="grey" content="啊" #icon>
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="success"
    title="成功"
    content="哪里成功"
    time="2018-04-03 20:46"
    #icon
  >
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="error"
    content="哪里错误"
    time="2018-04-03 20:46"
    #icon
  >
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="warning"
    title="警告"
    content="哪里警告"
    time="2018-04-03 20:46"
    #icon
  >
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="info"
    title="信息"
    content="是的"
    time="2018-04-03 20:46"
    #icon
  >
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
</n-timeline>
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
