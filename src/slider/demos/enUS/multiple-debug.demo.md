# More than 2 handles

Although I don't know where it can be used, but it looks cool.

```html
<n-space vertical>
  <n-slider range v-model:value="value" :step="1" />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([50, 70, 80, 90])
    }
  }
})
```
