# Use FormItem Alone

You can use `n-form-item` alone, without `n-form`.

```html
<n-form-item label="This is a FormItem" :rule="rule">
  <n-input v-model:value="value" />
</n-form-item>
```

```js
import { defineComponent, ref } from 'vue'

const lyrics = 'It is not in Form'

export default defineComponent({
  setup () {
    const valueRef = ref(lyrics)
    return {
      value: valueRef,
      rule: {
        trigger: ['input', 'blur'],
        validator () {
          if (valueRef.value !== lyrics) {
            return new Error(lyrics)
          }
        }
      }
    }
  }
})
```
