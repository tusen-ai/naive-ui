# Customize Icon

```html
<n-timeline>
  <n-timeline-item color="grey" content="Oops" #icon>
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="success"
    title="Success"
    content="success content"
    time="2018-04-03 20:46"
    #icon
  >
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="error"
    content="error content"
    time="2018-04-03 20:46"
    #icon
  >
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="warning"
    title="Warning"
    content="warning content"
    time="2018-04-03 20:46"
    #icon
  >
    <n-icon>
      <cash-icon />
    </n-icon>
  </n-timeline-item>
  <n-timeline-item
    type="info"
    title="Info"
    content="info content"
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
