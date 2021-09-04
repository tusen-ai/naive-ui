# Inline

For example, JavaScript.

```html
<div>
  JavaScript
  <n-code :code="code" language="javascript" inline />
</div>
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      code: 'console.log("Hello World")'
    }
  }
})
```
