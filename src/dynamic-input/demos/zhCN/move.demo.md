# 显示移动按钮

```html
<n-dynamic-input v-model:value="value" show-move-button placeholder="请输入" />
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
