# Countdown

```html
<n-countdown
  title="Countdown"
  :value="Date.now() + 2 * 3600 * 1000"
  :now="Date.now()"
  v-model:start="start"
/>
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
