# 图标

我喜欢用图标当头像。

```html
<n-avatar>
  <n-icon>
    <md-cash />
  </n-icon>
</n-avatar>
```

```js
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdCash
  }
})
```
