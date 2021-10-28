# Step time

Pass a number as an incremental step, or use an array to specify the values you want to show. If inputs do not adhere to these parameters, an invalid status will be shown (strikethrough text).

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
