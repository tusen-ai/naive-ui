# Basic

```html
<n-numeric-animation
  title="User Grouth"
  :value="50.52"
  :precision="2"
  :value-from="0"
  v-model:start="start"
  animation
>
  <template #suffix>%</template>
</n-numeric-animation>
<n-button @click="start=!start">Start</n-button>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      start: ref(false)
    }
  }
})
```
