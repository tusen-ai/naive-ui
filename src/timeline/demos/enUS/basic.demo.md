# Basic

```html
<n-timeline>
  <n-timeline-item content="Oops" />
  <n-timeline-item title="Earth">
    <template #icon>
      <n-icon><earth /></n-icon>
    </template>
  </n-timeline-item>
  <n-timeline-item
    type="success"
    title="Success"
    content="success content"
    time="2018-04-03 20:46"
  />
  <n-timeline-item
    type="error"
    content="Error content"
    time="2018-04-03 20:46"
  />
  <n-timeline-item
    type="warning"
    title="Warning"
    content="warning content"
    time="2018-04-03 20:46"
  />
  <n-timeline-item
    type="info"
    title="Info"
    content="info content"
    time="2018-04-03 20:46"
  />
</n-timeline>
```

```js
import { defineComponent } from 'vue'
import { Earth } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Earth
  }
})
```
