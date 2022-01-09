# Using pair preset

```html
<n-dynamic-input
  preset="pair"
  v-model:value="value"
  key-placeholder="Please input the key"
  value-placeholder="Please input the value"
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
      value: ref([
        {
          key: '',
          value: ''
        }
      ])
    }
  }
})
```
