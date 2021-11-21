# Content size

Text is resized to fit the avatar.

```html
<n-space vertical item-style="line-height: 0;">
  <n-space>
    <n-avatar>{{ value }}</n-avatar>
    <n-avatar round>{{ value }}</n-avatar>
  </n-space>
  <n-input v-model:value="value" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('Oasis')
    }
  }
})
```
