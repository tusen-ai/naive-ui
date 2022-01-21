# Use input preset

By default, the preset element of `n-dynamic-input` is `input`.

```html
<n-dynamic-input
  v-model:value="value"
  placeholder="Please type here"
  :min="3"
  :max="6"
/>
<pre>
{{  JSON.stringify(value, 0, 2) }}
</pre>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(['', '', ''])
    }
  }
})
```
