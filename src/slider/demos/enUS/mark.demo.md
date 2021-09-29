# Mark

```html
<n-space vertical>
  <n-slider v-model:value="value" range :marks="marks" :step="10" />
  <n-space>
    <n-input-number size="small" v-model:value="value[0]" />
    <n-input-number size="small" v-model:value="value[1]" />
  </n-space>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([50, 70]),
      marks: {
        34: 'Amazing',
        75: 'Good'
      }
    }
  }
})
```
