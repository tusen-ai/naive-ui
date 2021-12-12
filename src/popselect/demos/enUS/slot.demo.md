# Slot

Is there anybody who needs slots in a select menu?

```html
<n-popselect v-model:value="value" :options="[]" trigger="click">
  <n-button>{{ value || 'Popselect' }}</n-button>
  <template #empty>Nothing to see, here is empty.</template>
  <template #action>If you click this demo, you may need it.</template>
</n-popselect>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('Empty')
    }
  }
})
```
