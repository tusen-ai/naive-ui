# 显示排序按钮

默认状况下，`n-dynamic-input` 的预设是 `input`。

```html
<n-dynamic-input v-model:value="value" show-sort-button placeholder="请输入" />
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
