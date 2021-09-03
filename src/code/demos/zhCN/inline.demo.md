# 行内显示

JavaScript 的例子。

```html
<div>
  <n-text>JavaScript</n-text>
  <n-code :code="code" language="javascript" inline />
</div>
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      code: 'console.log("Hello Naive UI")'
    }
  }
})
```
