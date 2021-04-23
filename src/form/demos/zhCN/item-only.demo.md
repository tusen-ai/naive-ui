# 只使用 FormItem

你可以单独使用 `n-form-item`，不在 `n-form` 中验证表项。

```html
<n-form-item label="这是个 FormItem" :rule="rule">
  <n-input v-model:value="value" />
</n-form-item>
```

```js
import { defineComponent, ref } from 'vue'

const lyrics = '它不在 Form 里面'

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
