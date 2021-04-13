# Use with Form

It seems the example is useless. However since it's a data input component. I just put it here.

```html
<n-form :model="model">
  <n-form-item label="Color(#18a058)" path="color" :rule="colorRule">
    <n-color-picker v-model:value="model.color" />
  </n-form-item>
</n-form>
```

```js
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const model = reactive({
      color: '#18a058'
    })
    return {
      model,
      colorRule: {
        trigger: 'change',
        validator (value) {
          if (value !== '#18a058') return new Error("Don't change the color")
        }
      }
    }
  }
})
```
