# Step Time

Pass a number as step or use an array to specify the items you want to show, inputting values that don't follow step settings will cause displaying invalid status.

```html
<n-time-picker
  :hours="[8,18]"
  :minutes="8"
  :seconds="[0]"
  v-model:value="time"
/>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      time: ref(1183135260000)
    }
  }
})
```
