# Formatted value

Use `formatted-value` prop to get formatted string value from date picker.

Honestly I don't like the feature. Since at most of time it's not a best practice to passing time string around. However, real world is complex, I hope it can help you resolve some tricky problems.

```html
<pre>{{ formattedValue }}</pre>
<n-date-picker
  v-model:formatted-value="formattedValue"
  value-format="yyyy-MM-dd HH:mm:ss"
  type="datetime"
  clearable
/>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      formattedValue: ref('2007-06-30 12:08:55')
    }
  }
})
```
