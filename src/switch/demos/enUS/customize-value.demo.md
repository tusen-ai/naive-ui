# Customize checked value

Use `checked-value` and `unchecked-value` to customize respective values.

```html
<n-switch
  checked-value="Foo"
  unchecked-value="Bar"
  @update:value="handleUpdateValue"
/>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleUpdateValue (value) {
        message.info(value)
      }
    }
  }
})
```
