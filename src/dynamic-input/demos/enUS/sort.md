# Show sort button

```html
<n-dynamic-input
  v-model:value="value"
  placeholder="Please type here"
  show-sort-button
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
