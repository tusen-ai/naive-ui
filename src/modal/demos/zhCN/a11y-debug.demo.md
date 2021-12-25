# A11y debug

```html
<n-button @click="show = !show">Toggle</n-button>
<n-modal preset="card" title="A11Y" v-model:show="show" style="width: 600px;">
  <n-input placeholder="Gigigi" />
  <template #action>
    <n-button>Something</n-button>
  </template>
</n-modal>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
```
